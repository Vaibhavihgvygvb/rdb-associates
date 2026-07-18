# RDB Associates — Ramandeep Bawa

## Local Setup

### 1. Prerequisites
- Node.js ≥ 18 + Yarn
- Python 3.10+
- MongoDB running on localhost:27017

### 2. Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate      # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn server:app --reload --host 0.0.0.0 --port 8001