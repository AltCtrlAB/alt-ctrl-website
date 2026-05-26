from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Alt Ctrl API", version="0.1.0")

# ---------------------------------------------------------------------------
# CORS
# ---------------------------------------------------------------------------
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------------
class ContactRequest(BaseModel):
    name: str
    email: str
    message: str
    company: str | None = None


# ---------------------------------------------------------------------------
# API routes
# ---------------------------------------------------------------------------
@app.get("/api/health")
async def health():
    """Health check endpoint."""
    return {"status": "ok"}


@app.post("/api/contact")
async def contact(payload: ContactRequest):
    """
    Handle contact form submissions.
    TODO (Phase 6): wire up real email delivery via aiosmtplib / Resend / SendGrid.
    """
    contact_email = os.getenv("CONTACT_EMAIL", "info@altctrl.se")
    print(
        f"📧 New contact from {payload.name} <{payload.email}>"
        f" (company: {payload.company or '—'})"
    )
    print(f"   Message: {payload.message}")
    print(f"   → Would deliver to: {contact_email}")
    return {"success": True, "message": "Tack för ditt meddelande! Vi återkommer snart."}


# ---------------------------------------------------------------------------
# Serve built React SPA (production only — Vite dev server handles dev mode)
# ---------------------------------------------------------------------------
static_path = Path(__file__).parent / "static"
if static_path.exists() and (static_path / "index.html").exists():
    assets_path = static_path / "assets"
    if assets_path.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_path)), name="assets")

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        """Catch-all route: return index.html for any non-API path (SPA routing)."""
        return FileResponse(str(static_path / "index.html"))


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True,
    )
