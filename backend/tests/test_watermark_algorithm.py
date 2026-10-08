import os
import cv2
import numpy as np
import pytest
from pathlib import Path

from app.algorithms.watermark import embed_watermark, extract_watermark, compute_metrics

# Helper to generate a deterministic synthetic image with structure
def generate_test_image(width: int = 512, height: int = 512) -> np.ndarray:
    """Create a deterministic RGB image with gradients and shapes.
    The image contains enough variation for meaningful PSNR/SSIM.
    """
    # Gradient background
    x = np.linspace(0, 255, width, dtype=np.uint8)
    y = np.linspace(0, 255, height, dtype=np.uint8)
    xv, yv = np.meshgrid(x, y)
    base = np.stack([xv, yv, ((xv + yv) // 2)], axis=2)

    # Add a red square in the centre
    cx, cy = width // 2, height // 2
    size = min(width, height) // 4
    top, left = cy - size // 2, cx - size // 2
    base[top : top + size, left : left + size, 2] = 255  # increase blue channel for contrast
    return base.copy()

@pytest.fixture(scope="function")
def synthetic_image(tmp_path: Path) -> Path:
    img = generate_test_image()
    img_path = tmp_path / "original.png"
    cv2.imwrite(str(img_path), img)
    return img_path

def test_watermark_embed_extract_and_metrics(synthetic_image: Path, tmp_path: Path):
    # Load image
    original = cv2.imread(str(synthetic_image))
    assert original is not None, "Failed to read generated image"
    watermark_text = "COPYRIGHT © 2026 | OWNER: TEST USER | ID: TEST-001"
    secret_key = "DeterministicSecretKey123"

    # Embed watermark
    watermarked, info = embed_watermark(original, watermark_text, secret_key, strength=0.1)
    assert watermarked.shape == original.shape, "Watermarked image shape mismatch"
    # Ensure watermarked image is not identical pixel‑wise
    assert not np.array_equal(original, watermarked), "Watermarked image identical to original"

    # Save watermarked image to disk
    watermarked_path = tmp_path / "watermarked.png"
    cv2.imwrite(str(watermarked_path), watermarked)
    assert watermarked_path.exists(), "Watermarked file not saved"

    # Reload watermarked image
    reloaded = cv2.imread(str(watermarked_path))
    assert reloaded is not None, "Failed to reload watermarked image"
    assert reloaded.shape == original.shape, "Reloaded image shape mismatch"

    # Extract watermark using correct key
    extracted = extract_watermark(reloaded, secret_key, info["watermark_length"])
    assert extracted == watermark_text, f"Extracted watermark does not match (got: {extracted})"

    # Compute metrics
    metrics = compute_metrics(original, reloaded)
    # Basic sanity checks – values must be numeric and within plausible ranges
    assert metrics["psnr"] > 0, "PSNR should be positive"
    assert 0 <= metrics["ssim"] <= 1, "SSIM must be between 0 and 1"
    assert metrics["mse"] >= 0, "MSE cannot be negative"

    # Print metrics for visibility (pytest will capture output)
    print("Metrics:", metrics)

def test_wrong_key_fails_extraction(synthetic_image: Path, tmp_path: Path):
    original = cv2.imread(str(synthetic_image))
    watermark_text = "COPYRIGHT © 2026 | OWNER: TEST USER | ID: TEST-001"
    correct_key = "DeterministicSecretKey123"
    wrong_key = "IncorrectKey456"

    watermarked, info = embed_watermark(original, watermark_text, correct_key, strength=0.1)
    watermarked_path = tmp_path / "watermarked.png"
    cv2.imwrite(str(watermarked_path), watermarked)
    reloaded = cv2.imread(str(watermarked_path))

    extracted_wrong = extract_watermark(reloaded, wrong_key, info["watermark_length"])
    # With a wrong key the extracted bits should differ, yielding a different string
    assert extracted_wrong != watermark_text, "Extraction with wrong key should not match original watermark"
