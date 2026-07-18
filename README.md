# RDB Associates — Ramandeep Bawa

## Local Setup

### 1. Prerequisites
- Node.js ≥ 18 + Yarn
- Python 3.10+
- PostgreSQL running locally (or Docker)

### 2. Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

### 3. Frontend
```bash
cd frontend
yarn install
yarn start
```

### Docker
```bash
docker compose up --build -d
```
