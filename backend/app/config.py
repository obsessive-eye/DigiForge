import os
from pathlib import Path

# Base directory for the backend project
BASE_DIR = Path(__file__).resolve().parent.parent

# Directory where images are stored (originals and protected)
# Can be overridden by environment variable for testing
STORAGE_ROOT = Path(os.getenv("WATERMARK_STORAGE_ROOT", BASE_DIR / "storage"))

# Sub‑directories for different image types
ORIGINALS_DIR = STORAGE_ROOT / "originals"
PROTECTED_DIR = STORAGE_ROOT / "protected"

# Ensure directories exist at import time
for _dir in (ORIGINALS_DIR, PROTECTED_DIR):
    _dir.mkdir(parents=True, exist_ok=True)

# Similarity threshold (percentage) for watermark verification
SIMILARITY_THRESHOLD = float(os.getenv("WATERMARK_SIMILARITY_THRESHOLD", "0.85"))

# Maximum upload size (bytes) – default 10 MiB
MAX_UPLOAD_SIZE = int(os.getenv("WATERMARK_MAX_UPLOAD_SIZE", str(10 * 1024 * 1024)))
