from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Posture AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # e.g. ["http://localhost:5500", "https://yourapp.com"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Posture AI backend is running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}