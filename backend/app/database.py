"""Database connection and session handling for the watermarking API."""
import os
from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite file placed under storage directory (or can be overridden via env)
# In Vercel serverless environments, the root filesystem is read-only, so fallback to /tmp.
BASE_DIR = Path(__file__).resolve().parent.parent
default_db_path = Path("/tmp/storage/watermark.db") if os.getenv("VERCEL") else (BASE_DIR / "storage" / "watermark.db")
DB_PATH = Path(os.getenv("WATERMARK_DB_PATH", str(default_db_path)))
DB_PATH.parent.mkdir(parents=True, exist_ok=True)

engine = create_engine(f"sqlite:///{DB_PATH}", connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
