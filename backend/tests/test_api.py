import os
import io
import uuid
from pathlib import Path

import cv2
import numpy as np
import pytest
from fastapi.testclient import TestClient

# Ensure the storage root points to a temporary directory for isolation
@pytest.fixture(scope="session", autouse=True)
def set_storage_root(tmp_path_factory):
    storage_root = tmp_path_factory.mktemp("storage_root")
    os.environ["WATERMARK_STORAGE_ROOT"] = str(storage_root)
    # Also ensure DB path uses this root
    os.environ["WATERMARK_DB_PATH"] = str(storage_root / "watermark.db")
    # Import the app after env vars are set
    from backend.app.main import app  # noqa: F401
    return storage_root

# Helper to generate deterministic synthetic image
def generate_test_image(width: int = 512, height: int = 512) -> np.ndarray:
    x = np.linspace(0, 255, width, dtype=np.uint8)
    y = np.linspace(0, 255, height, dtype=np.uint8)
    xv, yv = np.meshgrid(x, y)
    base = np.stack([xv, yv, ((xv + yv) // 2)], axis=2)
    cx, cy = width // 2, height // 2
    size = min(width, height) // 4
    top, left = cy - size // 2, cx - size // 2
    base[top : top + size, left : left + size, 2] = 255
    return base.copy()

@pytest.fixture(scope="session")
def client(set_storage_root):
    from backend.app.main import app
    return TestClient(app)

def test_health(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "ok"
    assert "digital-watermarking-api" in data["service"]

def test_embed_and_flow(client):
    # Prepare image bytes
    img = generate_test_image()
    success, encoded = cv2.imencode('.png', img)
    assert success
    img_bytes = encoded.tobytes()

    files = {
        "image": ("test.png", io.BytesIO(img_bytes), "image/png"),
    }
    data = {
        "owner_name": "John Doe",
        "copyright_id": "IMG-2026-001",
        "secret_key": "DeterministicSecretKey123",
        "strength": "0.1",
    }
    r = client.post("/api/watermark/embed", files=files, data=data)
    assert r.status_code == 200
    resp = r.json()
    assert resp["success"] is True
    image_id = resp["image_id"]
    assert image_id
    assert "psnr" in resp and isinstance(resp["psnr"], float)
    assert "ssim" in resp and isinstance(resp["ssim"], float)
    assert "mse" in resp and isinstance(resp["mse"], float)
    assert "sha256" in resp and len(resp["sha256"]) == 64

    # Download protected image
    dl = client.get(f"/api/images/{image_id}/download")
    assert dl.status_code == 200
    # Verify that the returned content can be decoded by OpenCV
    np_arr = np.frombuffer(dl.content, np.uint8)
    downloaded = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    assert downloaded is not None
    assert downloaded.shape == img.shape

    # Verify with correct key
    verify_files = {"image": ("protected.png", io.BytesIO(dl.content), "image/png")}
    verify_data = {
        "image_id": image_id,
        "secret_key": "DeterministicSecretKey123",
    }
    vr = client.post("/api/watermark/verify", files=verify_files, data=verify_data)
    assert vr.status_code == 200
    vresp = vr.json()
    assert vresp["success"] is True
    assert vresp["watermark_detected"] is True
    assert vresp["copyright_status"] == "VERIFIED"
    assert vresp["owner_name"] == "John Doe"
    assert vresp["copyright_id"] == "IMG-2026-001"
    assert vresp["sha256_match"] is True
    assert vresp["integrity_status"] == "UNCHANGED"

    # Verify with wrong key
    wrong_data = {"image_id": image_id, "secret_key": "WrongKey123"}
    vr_wrong = client.post("/api/watermark/verify", files=verify_files, data=wrong_data)
    assert vr_wrong.status_code == 200
    wresp = vr_wrong.json()
    assert wresp["copyright_status"] != "VERIFIED"
    assert wresp["watermark_detected"] is False or wresp["similarity"] is None

def test_invalid_upload(client):
    # Upload non‑image data
    files = {"image": ("not_image.txt", io.BytesIO(b"this is not an image"), "text/plain")}
    data = {
        "owner_name": "Alice",
        "copyright_id": "ID-001",
        "secret_key": "key",
    }
    r = client.post("/api/watermark/embed", files=files, data=data)
    assert r.status_code == 400
    assert "Unable to decode" in r.json()["detail"]

def test_unknown_image_id(client):
    # Use a random UUID that does not exist
    random_id = str(uuid.uuid4())
    img = generate_test_image()
    success, enc = cv2.imencode('.png', img)
    img_bytes = enc.tobytes()
    files = {"image": ("img.png", io.BytesIO(img_bytes), "image/png")}
    data = {"image_id": random_id, "secret_key": "any"}
    r = client.post("/api/watermark/verify", files=files, data=data)
    assert r.status_code == 404
    assert "Image ID not found" in r.json()["detail"]
