# schemas/watermark.py
from pydantic import BaseModel, Field
from typing import Optional

class HealthResponse(BaseModel):
    status: str = Field(..., description="Health status, always 'ok'")
    service: str = Field(..., description="Name of the service")

class EmbedResponse(BaseModel):
    success: bool = Field(..., description="Embedding succeeded")
    image_id: str = Field(..., description="Unique identifier for the protected image")
    owner_name: str
    copyright_id: str
    watermark_length: int
    psnr: float
    ssim: float
    mse: float
    sha256: str
    download_url: str

class VerifyResponse(BaseModel):
    success: bool = Field(..., description="Verification request processed")
    watermark_detected: bool = Field(..., description="Whether a watermark was extracted")
    owner_name: Optional[str] = Field(None, description="Owner name from extracted watermark when verified")
    copyright_id: Optional[str] = Field(None, description="Copyright ID from extracted watermark when verified")
    similarity: Optional[float] = Field(None, description="Similarity percentage between stored and extracted watermark")
    copyright_status: str = Field(..., description="VERIFIED, NOT_VERIFIED, or UNKNOWN")
    sha256_match: Optional[bool] = Field(None, description="Whether SHA‑256 hash matches stored hash")
    integrity_status: Optional[str] = Field(None, description="UNCHANGED or FILE_CHANGED")
