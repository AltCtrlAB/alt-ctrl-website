# ─── Stage 1: Build React frontend ──────────────────────────────────────────
FROM node:22-slim AS frontend-build

WORKDIR /build

# Enable pnpm via corepack (ships with Node 22)
RUN corepack enable

# Copy all frontend source (node_modules excluded via .dockerignore)
COPY frontend/ .

# Install deps from lockfile — deterministic
RUN pnpm install --frozen-lockfile

# Build — override outDir so we don't need /build/../backend/ to exist
RUN pnpm build -- --outDir /static

# ─── Stage 2: Python runtime ─────────────────────────────────────────────────
FROM python:3.12-slim AS runtime

WORKDIR /app

# Install uv (fast Python package manager)
RUN pip install uv --no-cache-dir

# Install Python dependencies from lockfile
COPY backend/pyproject.toml backend/uv.lock ./
RUN uv sync --no-dev --frozen

# Copy application code and built frontend from stage 1
COPY backend/main.py .
COPY --from=frontend-build /static ./static

# Expose the application port
EXPOSE 8000

# Default environment — override at runtime via -e or env_file
ENV PORT=8000
ENV CORS_ORIGINS=*
ENV CONTACT_EMAIL=info@alltunderkontroll.se

# Health check using Python's built-in urllib (no curl needed in slim)
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD python -c "import urllib.request; urllib.request.urlopen('http://localhost:8000/api/health')" \
  || exit 1

CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
