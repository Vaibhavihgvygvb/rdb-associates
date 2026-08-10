from fastapi import FastAPI, APIRouter, HTTPException, Form, UploadFile, File
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import Optional, Literal
from pathlib import Path
from datetime import datetime, timezone
import logging
import os
import uuid
import asyncpg

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

UPLOADS_DIR = ROOT_DIR / "uploads" / "resumes"
# Content type -> the extension the stored file is given. A mapping rather
# than a set because the stored filename's extension is now derived from the
# verified content type instead of from the client-supplied filename.
RESUME_CONTENT_TYPES = {
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
}
MAX_RESUME_SIZE = 5 * 1024 * 1024

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL environment variable is missing.")

app = FastAPI(title="RDB Associates API")
api_router = APIRouter(prefix="/api")

pool = None


async def get_db():
    if pool is None:
        raise RuntimeError("Database pool not initialized")
    async with pool.acquire() as conn:
        yield conn


class ConsultationCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=20)
    practice_area: Optional[str] = Field(default=None, max_length=80)
    subject: Optional[str] = Field(default=None, max_length=200)
    message: str = Field(..., min_length=10, max_length=3000)


class Consultation(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    practice_area: Optional[str] = None
    subject: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "new"


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterSubscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class CareerApplication(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    applicant_type: Literal["recruitment", "internship"]
    position: Optional[str] = None
    message: Optional[str] = None
    resume_filename: Optional[str] = None
    resume_path: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "new"


@app.on_event("startup")
async def startup():
    global pool
    pool = await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=5)
    async with pool.acquire() as conn:
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS consultations (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT NOT NULL,
                practice_area TEXT,
                subject TEXT,
                message TEXT NOT NULL,
                created_at TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'new'
            )
        """)
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                id TEXT PRIMARY KEY,
                email TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL
            )
        """)
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS career_applications (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                applicant_type TEXT NOT NULL,
                position TEXT,
                message TEXT,
                resume_filename TEXT,
                resume_path TEXT,
                created_at TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'new'
            )
        """)
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    logger.info("Connected to PostgreSQL and tables ensured.")


@app.on_event("shutdown")
async def shutdown():
    if pool:
        await pool.close()
        logger.info("Database pool closed.")


@api_router.get("/")
async def root():
    return {"firm": "RDB Associates", "advocate": "Ramandeep Bawa", "status": "online"}


@api_router.get("/health")
async def health():
    return {"status": "ok", "database": "postgresql"}


@api_router.post("/consultations", response_model=Consultation, status_code=201)
async def create_consultation(payload: ConsultationCreate):
    try:
        record = Consultation(**payload.model_dump())
        async with pool.acquire() as conn:
            await conn.execute(
                """INSERT INTO consultations (id, name, email, phone, practice_area, subject, message, created_at, status)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)""",
                record.id, record.name, record.email, record.phone,
                record.practice_area, record.subject, record.message,
                record.created_at, record.status,
            )
        logger.info("New consultation from %s <%s>", record.name, record.email)
        return record
    except Exception:
        logger.exception("Failed to save consultation.")
        raise HTTPException(status_code=500, detail="Unable to save consultation.")


@api_router.post("/newsletter", response_model=NewsletterSubscriber, status_code=201)
async def subscribe_newsletter(payload: NewsletterCreate):
    record = NewsletterSubscriber(**payload.model_dump())
    try:
        async with pool.acquire() as conn:
            await conn.execute(
                "INSERT INTO newsletter_subscribers (id, email, created_at) VALUES ($1, $2, $3)",
                record.id, record.email, record.created_at,
            )
        logger.info("New newsletter subscriber <%s>", record.email)
        return record
    except asyncpg.UniqueViolationError:
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                "SELECT id, email, created_at FROM newsletter_subscribers WHERE email = $1",
                record.email,
            )
        return dict(row)
    except Exception:
        logger.exception("Failed to save newsletter subscriber.")
        raise HTTPException(status_code=500, detail="Unable to subscribe. Please try again.")


@api_router.post("/careers", response_model=CareerApplication, status_code=201)
async def create_career_application(
    name: str = Form(..., min_length=2, max_length=120),
    email: EmailStr = Form(...),
    phone: Optional[str] = Form(default=None, max_length=20),
    applicant_type: Literal["recruitment", "internship"] = Form(...),
    position: Optional[str] = Form(default=None, max_length=120),
    message: Optional[str] = Form(default=None, max_length=3000),
    resume: Optional[UploadFile] = File(default=None),
):
    resume_filename = None
    resume_path = None

    if resume is not None:
        if resume.content_type not in RESUME_CONTENT_TYPES:
            raise HTTPException(status_code=400, detail="Resume must be a PDF or Word document.")

        # Read in bounded chunks and stop at the first byte over the limit.
        # This used to be a single `await resume.read()` followed by a length
        # check, which meant the whole body was resident in memory before the
        # limit was consulted — a 2GB POST was fully buffered in order to be
        # rejected. With no rate limiting in front of this endpoint that is a
        # one-request denial of service.
        contents = bytearray()
        while chunk := await resume.read(64 * 1024):
            contents.extend(chunk)
            if len(contents) > MAX_RESUME_SIZE:
                raise HTTPException(status_code=400, detail="Resume must be under 5MB.")

        # The stored name is derived, never taken from the client.
        #
        # It was `f"{uuid4()}_{resume.filename}"` joined onto UPLOADS_DIR.
        # `resume.filename` is attacker-controlled, and while the UUID prefix
        # neutralises the *first* path segment, any `../` segments after it
        # resolve normally — so a filename like `x/../../../etc/cron.d/job`
        # escaped the upload directory entirely. Only the basename is kept, the
        # extension is taken from the verified content type rather than from
        # the name, and the result is confirmed to sit inside UPLOADS_DIR
        # before anything is written.
        suffix = RESUME_CONTENT_TYPES[resume.content_type]
        target_path = (UPLOADS_DIR / f"{uuid.uuid4()}{suffix}").resolve()
        if not target_path.is_relative_to(UPLOADS_DIR.resolve()):
            raise HTTPException(status_code=400, detail="Invalid upload.")

        UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
        target_path.write_bytes(bytes(contents))

        # The original name is still recorded for the reader's benefit, but as
        # data in a column — never as part of a filesystem path.
        resume_filename = Path(resume.filename or "resume").name
        resume_path = str(target_path)

    record = CareerApplication(
        name=name, email=email, phone=phone, applicant_type=applicant_type,
        position=position, message=message,
        resume_filename=resume_filename, resume_path=resume_path,
    )
    try:
        async with pool.acquire() as conn:
            await conn.execute(
                """INSERT INTO career_applications
                   (id, name, email, phone, applicant_type, position, message, resume_filename, resume_path, created_at, status)
                   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)""",
                record.id, record.name, record.email, record.phone, record.applicant_type,
                record.position, record.message, record.resume_filename, record.resume_path,
                record.created_at, record.status,
            )
        logger.info("New career application from %s <%s> (%s)", record.name, record.email, record.applicant_type)
        return record
    except Exception:
        logger.exception("Failed to save career application.")
        raise HTTPException(status_code=500, detail="Unable to submit application.")


@api_router.get("/profile")
async def profile():
    return {
        "firm": "RDB Associates",
        "advocate": {
            "name": "Ramandeep Bawa",
            "designation": "Advocate, High Court of Delhi",
            "location": "New Delhi, India",
            "languages": ["English", "Hindi", "Punjabi", "Japanese (Limited Working)"],
            "philosophy": "I never lose. I either win or learn. — Nelson Mandela",
        },
        "practice_areas": [
            "Civil Litigation", "Commercial Litigation", "Trial Advocacy",
            "Alternative Dispute Resolution", "Medical Law & Ethics",
            "Cyber Law", "Litigation before Tribunals", "Legal Advisory & Drafting",
        ],
    }


app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
