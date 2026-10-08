"""SQLAlchemy models for the watermarking API.

We reuse the Base defined in ``app.database`` so that ``Base.metadata.create_all`` works correctly.
"""
import uuid
from datetime import datetime

from sqlalchemy import Column, DateTime, String

# Import the shared Base instance
from .database import Base

class ImageRecord(Base):
    __tablename__ = "images"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    owner_name = Column(String, nullable=False)
    copyright_id = Column(String, nullable=False)
    watermark_text = Column(String, nullable=False)  # stored for verification
    watermark_length = Column(String, nullable=False)
    protected_path = Column(String, nullable=False)
    sha256 = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
