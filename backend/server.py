from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
from pathlib import Path
from datetime import datetime, timezone
import logging
import os
import uuid
import asyncpg

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

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
    logger.info("Connected to PostgreSQL and table ensured.")


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


@api_router.get("/consultations", response_model=List[Consultation])
async def list_consultations(limit: int = 100):
    if limit < 1 or limit > 500:
        raise HTTPException(status_code=400, detail="limit must be between 1 and 500")
    async with pool.acquire() as conn:
        rows = await conn.fetch(
            "SELECT id, name, email, phone, practice_area, subject, message, created_at, status FROM consultations ORDER BY created_at DESC LIMIT $1",
            limit,
        )
    return [dict(r) for r in rows]


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
