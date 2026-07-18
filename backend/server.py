from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ["MONGO_URL"]

client = AsyncIOMotorClient(mongo_url)

db = client[os.environ["DB_NAME"]]

app = FastAPI(title="RDB Associates API")
api_router = APIRouter(prefix="/api")


# ---------- Models ----------
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


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"firm": "RDB Associates", "advocate": "Ramandeep Bawa", "status": "online"}


@api_router.get("/health")
async def health():
    return {"status": "ok"}


@api_router.post("/consultations", response_model=Consultation, status_code=201)
async def create_consultation(payload: ConsultationCreate):
    record = Consultation(**payload.model_dump())
    await db.consultations.insert_one(record.model_dump())
    logger.info("New consultation from %s <%s>", record.name, record.email)
    return record


@api_router.get("/consultations", response_model=List[Consultation])
async def list_consultations(limit: int = 100):
    if limit < 1 or limit > 500:
        raise HTTPException(status_code=400, detail="limit must be between 1 and 500")
    docs = await db.consultations.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    return docs


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
            "Civil Litigation",
            "Commercial Litigation",
            "Trial Advocacy",
            "Alternative Dispute Resolution",
            "Medical Law & Ethics",
            "Cyber Law",
            "Litigation before Tribunals",
            "Legal Advisory & Drafting",
        ],
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()