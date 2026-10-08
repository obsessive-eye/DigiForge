from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from fastapi.responses import FileResponse
from typing import Optional

from ..schemas.watermark import (
    EmbedResponse,
    VerifyResponse,
    HealthResponse,
)
from ..services.watermark_service import WatermarkService, get_watermark_service

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="ok", service="digital-watermarking-api")

@router.post("/watermark/embed", response_model=EmbedResponse)
async def embed_watermark(
    image: UploadFile = File(...),
    owner_name: str = Form(...),
    copyright_id: str = Form(...),
    secret_key: str = Form(...),
    strength: Optional[float] = Form(0.1),
    service: WatermarkService = Depends(get_watermark_service),
):
    try:
        return await service.embed(
            image_file=image,
            owner_name=owner_name,
            copyright_id=copyright_id,
            secret_key=secret_key,
            strength=strength,
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        )

@router.get("/images/{image_id}/download")
async def download_image(
    image_id: str,
    service: WatermarkService = Depends(get_watermark_service),
):
    file_path = service.get_protected_image_path(image_id)
    if not file_path or not file_path.is_file():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Protected image not found",
        )
    return FileResponse(path=str(file_path), media_type="image/png")

@router.post("/watermark/verify", response_model=VerifyResponse)
async def verify_watermark(
    image: UploadFile = File(...),
    image_id: str = Form(...),
    secret_key: str = Form(...),
    service: WatermarkService = Depends(get_watermark_service),
):
    try:
        return await service.verify(
            image_file=image,
            image_id=image_id,
            secret_key=secret_key,
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        )
