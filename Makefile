.PHONY: install install-frontend install-backend dev dev-frontend dev-backend build start

# ── Install ──────────────────────────────────────────────────────────────────

install: install-frontend install-backend
	@echo "✅ All dependencies installed."

install-frontend:
	@echo "📦 Installing frontend dependencies (pnpm)..."
	cd frontend && pnpm install

install-backend:
	@echo "🐍 Installing backend dependencies (uv)..."
	cd backend && uv sync

# ── Development ───────────────────────────────────────────────────────────────
# Run these in two separate terminals, or use a process manager.

dev-backend:
	@echo "🚀 Starting FastAPI backend on http://localhost:8000 ..."
	cd backend && uv run uvicorn main:app --reload --port 8000

dev-frontend:
	@echo "⚡ Starting Vite dev server on http://localhost:5173 ..."
	cd frontend && pnpm dev

# Convenience target: prints instructions (cross-platform safe)
dev:
	@echo ""
	@echo "Start the dev servers in two separate terminals:"
	@echo "  Terminal 1: make dev-backend"
	@echo "  Terminal 2: make dev-frontend"
	@echo ""
	@echo "Or with concurrently (npm install -g concurrently):"
	@echo "  concurrently \"make dev-backend\" \"make dev-frontend\""
	@echo ""

# ── Production ────────────────────────────────────────────────────────────────

build:
	@echo "🏗️  Building frontend → backend/static/ ..."
	cd frontend && pnpm build
	@echo "✅ Build complete."

start:
	@echo "🚀 Starting production server on port $${PORT:-8000} ..."
	cd backend && uv run uvicorn main:app --host 0.0.0.0 --port $${PORT:-8000}
