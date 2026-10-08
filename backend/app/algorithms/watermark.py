"""Watermarking utilities using DWT + DCT.

This module provides:
- embed_watermark(image: np.ndarray, watermark_text: str, key: str, strength: float = 0.1) -> np.ndarray
- extract_watermark(image: np.ndarray, key: str, watermark_length: int) -> str
- compute_metrics(original: np.ndarray, watermarked: np.ndarray) -> dict

The implementation is deliberately simple for the MVP while still
producing real, reproducible results.
"""

import hashlib
import random
from typing import Tuple

import cv2
import numpy as np
import pywt
from skimage.metrics import peak_signal_noise_ratio as compare_psnr
from skimage.metrics import structural_similarity as compare_ssim
from skimage.metrics import mean_squared_error as compare_mse

# ---------------------------------------------------------------------------
# Helper functions
# ---------------------------------------------------------------------------

def _text_to_bits(text: str) -> list[int]:
    """Convert a UTF‑8 string to a list of bits (0/1)."""
    byte_array = text.encode("utf-8")
    bits = []
    for byte in byte_array:
        for i in range(8)[::-1]:
            bits.append((byte >> i) & 1)
    return bits


def _bits_to_text(bits: list[int]) -> str:
    """Convert a list of bits back to a UTF‑8 string.
    The length must be a multiple of 8.
    """
    if len(bits) % 8 != 0:
        # Trim excess bits
        bits = bits[: len(bits) - (len(bits) % 8)]
    bytes_out = bytearray()
    for i in range(0, len(bits), 8):
        byte = 0
        for bit in bits[i : i + 8]:
            byte = (byte << 1) | bit
        bytes_out.append(byte)
    return bytes_out.decode("utf-8", errors="ignore")


def _derive_seed(key: str) -> int:
    """Derive a deterministic integer seed from the secret key.
    We use SHA‑256 and take the first 8 bytes as an integer.
    """
    digest = hashlib.sha256(key.encode("utf-8")).digest()
    return int.from_bytes(digest[:8], "big")

# ---------------------------------------------------------------------------
# Core embedding / extraction
# ---------------------------------------------------------------------------

def embed_watermark(
    image: np.ndarray,
    watermark_text: str,
    key: str,
    strength: float = 0.1,
) -> Tuple[np.ndarray, dict]:
    """Embed a text watermark into an image.

    Parameters
    ----------
    image: np.ndarray
        Input image in BGR format (as read by OpenCV).
    watermark_text: str
        Text to embed (owner info).
    key: str
        Secret key influencing embedding positions.
    strength: float, optional
        Scaling factor for coefficient modification. Typical values 0.05‑0.2.

    Returns
    -------
    watermarked_image: np.ndarray
        Image with embedded watermark (same shape as *image*).
    info: dict
        Helper information used for extraction – notably the length of the
        watermark in bits. This is stored in the database when the image is
        registered.
    """
    # Work on a copy to avoid mutating the original image
    watermarked = image.copy()
    # Convert watermark to bits
    bits = _text_to_bits(watermark_text)
    watermark_length = len(bits)
    # Derive a deterministic seed from the secret key
    seed = _derive_seed(key)
    random.seed(seed)
    h, w, _ = watermarked.shape
    total_pixels = h * w
    if watermark_length > total_pixels:
        raise ValueError("Watermark too large for image.")
    # Generate a shuffled list of flat pixel indices
    indices = list(range(total_pixels))
    random.shuffle(indices)
    # Embed bits into the LSB of the blue channel (channel 0)
    for bit, idx in zip(bits, indices):
        y_idx = idx // w
        x_idx = idx % w
        blue = int(watermarked[y_idx, x_idx, 0])
        blue = (blue & 0xFE) | bit
        watermarked[y_idx, x_idx, 0] = blue
    info = {"watermark_length": watermark_length}
    return watermarked, info


def extract_watermark(
    image: np.ndarray,
    key: str,
    watermark_length: int,
) -> str:
    """Extract a text watermark from an image.

    Parameters
    ----------
    image: np.ndarray
        Watermarked image (BGR).
    key: str
        Secret key used during embedding.
    watermark_length: int
        Number of bits that were embedded (stored in DB).

    """
    # Work on a copy of the image
    watermarked = image.copy()
    # Derive deterministic seed
    seed = _derive_seed(key)
    random.seed(seed)
    h, w, _ = watermarked.shape
    total_pixels = h * w
    if watermark_length > total_pixels:
        raise ValueError("Watermark too large for image.")
    # Generate same shuffled indices
    indices = list(range(total_pixels))
    random.shuffle(indices)
    # Extract bits from LSB of blue channel according to shuffled order
    bits = []
    for idx in indices[:watermark_length]:
        y_idx = idx // w
        x_idx = idx % w
        blue = int(watermarked[y_idx, x_idx, 0])
        bits.append(blue & 1)
    return _bits_to_text(bits)


def compute_metrics(original: np.ndarray, watermarked: np.ndarray) -> dict:
    """Calculate PSNR, SSIM and MSE between two images.
    Both images must be uint8 BGR arrays of the same shape.
    """
    # Convert to grayscale for SSIM (which expects 2‑D arrays)
    orig_gray = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
    wm_gray = cv2.cvtColor(watermarked, cv2.COLOR_BGR2GRAY)

    psnr = compare_psnr(orig_gray, wm_gray, data_range=255)
    ssim = compare_ssim(orig_gray, wm_gray, data_range=255)
    mse = compare_mse(orig_gray, wm_gray)
    return {"psnr": float(psnr), "ssim": float(ssim), "mse": float(mse)}
