"""FastAPI application entry point"""

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
import os

from .api.router import router as api_router

# Initialize database tables
from .database import engine, Base
from .models import ImageRecord
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Digital Watermarking MVP")

# Development CORS – allow Vite frontend origin only (or production URL)
frontend_origin = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(api_router, prefix="/api")
