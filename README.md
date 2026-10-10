# DigiForge

**Your images. Your ownership.**

DigiForge is a digital watermarking project designed to embed invisible copyright information into images and help verify image ownership. It combines a React-based web interface with a Python FastAPI backend and a DWT–DCT watermarking pipeline.

> **Project status:** The application has been deployed to Vercel, but its current SQLite database and local image storage use ephemeral serverless storage. Do not rely on the hosted deployment for permanent image or record retention until persistent database and object storage are configured.

## Live Demo

- **Web app:** https://digiforge-theta.vercel.app
- **GitHub repository:** https://github.com/obsessive-eye/DigiForge

## Features

- **Invisible watermark embedding:** Embed copyright information into an image using a Discrete Wavelet Transform (DWT) and Discrete Cosine Transform (DCT) approach.
- **Ownership verification:** Submit a protected image and the secret key to attempt to recover and verify the embedded watermark.
- **Image ID:** Display a backend-generated identifier for a protected image record.
- **Protected image download:** Download the processed image.
- **Image quality metrics:** Display metrics such as PSNR, SSIM, and MSE when returned by the processing pipeline.
- **SHA-256 hash:** Display a cryptographic hash for integrity-related reference.
- **Responsive web interface:** Dashboard, Protect, Verify, About, and User Manual pages.

## Technology Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Lucide / Material Symbols icons

### Backend
- Python
- FastAPI
- Uvicorn
- NumPy
- OpenCV (headless)
- Pillow
- PyWavelets
- SciPy
- scikit-image
- SQLAlchemy
- SQLite
- Python Cryptography library

## Project Structure

```text
DigiForge/
├── app/                 # Python package compatibility shim
├── backend/
│   ├── app/             # FastAPI application, algorithms, routes, models
│   ├── tests/           # Backend tests
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── public/          # Static assets
│   ├── src/             # React application and frontend tests
│   └── package.json
├── docs/
│   └── DESIGN.md        # Design-system documentation
├── .gitignore
├── tsconfig.json
└── vercel.json
```

## Run Locally

### Requirements

Install the following before starting:

- Python 3.10 or a compatible version supported by the pinned backend dependencies
- Node.js and npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/obsessive-eye/DigiForge.git
cd DigiForge
```

### 2. Set up the backend

From the repository root, create and activate a virtual environment.

**Windows PowerShell**

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
$env:PYTHONPATH = ".;backend"
python -m uvicorn app.main:app --reload --app-dir backend --host 127.0.0.1 --port 8000
```

**macOS / Linux / Git Bash**

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r backend/requirements.txt
export PYTHONPATH=".:backend"
python -m uvicorn app.main:app --reload --app-dir backend --host 127.0.0.1 --port 8000
```

The API should be available at `http://127.0.0.1:8000`. Check the health endpoint:

```text
http://127.0.0.1:8000/api/health
```

### 3. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite, commonly `http://localhost:5173`.

The Vite development proxy is configured to forward `/api` requests to the local FastAPI server on port `8000`.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/health` | Check backend health |
| `POST` | `/api/watermark/embed` | Embed a watermark into an uploaded image |
| `POST` | `/api/watermark/verify` | Verify/recover watermark information from an image |
| `GET` | `/api/images/{image_id}/download` | Download a stored protected image |

For exact request fields and response schemas, refer to the backend route and schema definitions in `backend/app/`.

## How to Use

1. Open **Protect Image**.
2. Upload an image and enter the owner name, copyright ID, and secret key.
3. Run the protection process.
4. Save the generated **Image ID** and keep the secret key private.
5. Download the protected image.
6. Open **Verify Image**, provide the required protected image and secret key, and supply the Image ID if requested by the form.
7. Review the verification result and any available integrity information.

**Important:** An Image ID identifies an image record; it is not a replacement for the protected image or the secret key. Keep a safe copy of the protected image and remember the key used when embedding the watermark.

## Development Checks

Run frontend tests:

```bash
cd frontend
npm test -- --run
```

Check TypeScript:

```bash
npx tsc --noEmit
```

Build the frontend:

```bash
npm run build
```

Run backend tests from the repository root with the virtual environment activated:

```bash
# Windows PowerShell
$env:PYTHONPATH = ".;backend"
python -m pytest backend/tests

# macOS / Linux / Git Bash
export PYTHONPATH=".:backend"
python -m pytest backend/tests
```

## Deployment Notes

The project includes a Vercel configuration for the frontend and API routing. Check the Vercel project settings and current deployment configuration before redeploying.

### Storage limitation

The current backend uses SQLite and local filesystem storage. In Vercel serverless environments, `/tmp` storage is temporary, may be cleared, and is not shared reliably between separate function instances. A successful deployment therefore does **not** guarantee that image files or SQLite records will remain available.

For reliable production persistence, configure:
- A persistent external database, such as PostgreSQL.
- Durable object storage for uploaded and protected image files.
- Appropriate environment variables and access permissions.

Do not store secret keys, credentials, private images, runtime databases, or `.env` files in GitHub.

## Security and Scope

- Keep watermark secret keys private.
- Only upload images you have permission to process.
- A watermark and a SHA-256 hash serve different purposes; a hash alone does not prove copyright ownership.
- This is an academic project and should not be treated as a substitute for a complete legal copyright-registration or digital asset management system.

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Make and test your changes.
4. Submit a pull request describing the change.

## License

No license is specified in this repository README. Unless a license file is added to the repository, do not assume that the code is licensed for unrestricted reuse.

---

Made as an academic digital watermarking project.
