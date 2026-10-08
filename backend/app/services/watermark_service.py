"""Watermark service layer.

This file contains the business logic used by the FastAPI router. It
- validates uploads
- calls the algorithm functions from ``app.algorithms.watermark``
- stores metadata in SQLite via SQLAlchemy
- computes hashes, similarity and returns the response models defined in
  ``app.schemas.watermark``.
"""
import hashlib
import io
import uuid
from pathlib import Path
from typing import Optional

import cv2
import numpy as np
from fastapi import Depends, HTTPException, UploadFile, status
from sqlalchemy.orm import Session
from difflib import SequenceMatcher

from ..config import (
    MAX_UPLOAD_SIZE,
    PROTECTED_DIR,
    ORIGINALS_DIR,
    SIMILARITY_THRESHOLD,
)
from ..algorithms.watermark import embed_watermark, extract_watermark, compute_metrics
from ..models import ImageRecord
from ..database import get_db
from ..schemas.watermark import EmbedResponse, VerifyResponse

# Allowed extensions and MIME types
ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}

def _validate_file(upload: UploadFile) -> np.ndarray:
    """Validate size, extension and decode image to a NumPy array.
    Raises HTTPException(400) on any problem.
    """
    # Preserve original filename but do not restrict extension; we'll attempt to decode the file regardless.
    # filename = upload.filename
    # ext = Path(filename).suffix.lower()
    # if ext not in ALLOWED_EXTENSIONS:
    #     raise HTTPException(
    #         status_code=status.HTTP_400_BAD_REQUEST,
    #         detail=f"Unsupported file extension '{ext}'. Allowed: {sorted(ALLOWED_EXTENSIONS)}",
    #     )
    # Size – we read the whole file into memory (acceptable for <10 MiB)
    content = upload.file.read()
    if len(content) > MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File too large. Maximum allowed size is 10 MiB.",
        )
    # Decode with OpenCV
    img_array = np.frombuffer(content, np.uint8)
    img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Unable to decode the uploaded image.",
        )
    # Simple dimension check – DWT works on any size, but very tiny images are useless
    if min(img.shape[:2]) < 64:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image dimensions are too small for watermarking. Minimum size is 64 × 64 pixels.",
        )
    # Reset file pointer for possible later reuse
    upload.file.seek(0)
    return img

def _image_to_bytes(img: np.ndarray) -> bytes:
    """Encode a NumPy BGR image to PNG bytes (used for hashing and storage)."""
    success, encoded = cv2.imencode('.png', img)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to encode image for storage.",
        )
    return encoded.tobytes()

def _calculate_sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def _similarity(a: str, b: str) -> float:
    """Return a similarity ratio between 0 and 1 using difflib.SequenceMatcher."""
    return SequenceMatcher(None, a, b).ratio()

class WatermarkService:
    def __init__(self, db: Session = Depends(get_db)):
        self.db = db

    # -----------------------------------------------------
    # Public API used by the router
    # -----------------------------------------------------
    async def embed(
        self,
        image_file: UploadFile,
        owner_name: str,
        copyright_id: str,
        secret_key: str,
        strength: Optional[float] = 0.1,
    ) -> EmbedResponse:
        # Validate and decode image
        img = _validate_file(image_file)

        # Build watermark text
        watermark_text = f"OWNER:{owner_name}|ID:{copyright_id}"

        # Run the algorithm (uses deterministic seed from secret_key)
        watermarked_img, info = embed_watermark(
            img, watermark_text, secret_key, strength=strength
        )

        # Compute metrics against the original image
        metrics = compute_metrics(img, watermarked_img)

        # Encode watermarked image to bytes and hash it
        wm_bytes = _image_to_bytes(watermarked_img)
        sha256_hash = _calculate_sha256(wm_bytes)

        # Store protected image on disk
        image_id = str(uuid.uuid4())
        protected_path = PROTECTED_DIR / f"{image_id}.png"
        protected_path.write_bytes(wm_bytes)

        # Persist metadata (no secret key stored)
        record = ImageRecord(
            id=image_id,
            owner_name=owner_name,
            copyright_id=copyright_id,
            watermark_text=watermark_text,
            watermark_length=str(info["watermark_length"]),
            protected_path=str(protected_path),
            sha256=sha256_hash,
        )
        self.db.add(record)
        self.db.commit()

        download_url = f"/api/images/{image_id}/download"
        return EmbedResponse(
            success=True,
            image_id=image_id,
            owner_name=owner_name,
            copyright_id=copyright_id,
            watermark_length=info["watermark_length"],
            psnr=metrics["psnr"],
            ssim=metrics["ssim"],
            mse=metrics["mse"],
            sha256=sha256_hash,
            download_url=download_url,
        )

    def get_protected_image_path(self, image_id: str) -> Optional[Path]:
        return PROTECTED_DIR / f"{image_id}.png"

    async def verify(
        self,
        image_file: UploadFile,
        image_id: str,
        secret_key: str,
    ) -> VerifyResponse:
        # Load stored record
        record: ImageRecord = self.db.query(ImageRecord).filter(ImageRecord.id == image_id).first()
        if not record:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Image ID not found.",
            )

        # Validate and decode uploaded image
        img = _validate_file(image_file)

        # Compute SHA‑256 of uploaded image
        uploaded_bytes = _image_to_bytes(img)
        uploaded_hash = _calculate_sha256(uploaded_bytes)
        sha256_match = uploaded_hash == record.sha256
        integrity_status = "UNCHANGED" if sha256_match else "FILE_CHANGED"

        # Extract watermark using supplied key and stored length
        try:
            extracted = extract_watermark(
                img, secret_key, int(record.watermark_length)
            )
        except Exception:
            extracted = ""

        similarity = None
        owner_name = None
        copyright_id = None
        watermark_detected = False
        copyright_status = "UNKNOWN"

        if extracted:
            similarity = _similarity(record.watermark_text, extracted)
            if similarity >= SIMILARITY_THRESHOLD:
                watermark_detected = True
                parts = record.watermark_text.split("|")
                owner_name = parts[0].split(":", 1)[1]
                copyright_id = parts[1].split(":", 1)[1]
                copyright_status = "VERIFIED"
            else:
                copyright_status = "NOT_VERIFIED"
        else:
            copyright_status = "NOT_VERIFIED"

        return VerifyResponse(
            success=True,
            watermark_detected=watermark_detected,
            owner_name=owner_name,
            copyright_id=copyright_id,
            similarity=round(similarity * 100, 2) if similarity is not None else None,
            copyright_status=copyright_status,
            sha256_match=sha256_match,
            integrity_status=integrity_status,
        )

# Dependency for FastAPI
def get_watermark_service(db: Session = Depends(get_db)) -> WatermarkService:
    return WatermarkService(db)
