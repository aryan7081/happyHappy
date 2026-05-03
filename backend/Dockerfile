# syntax=docker/dockerfile:1
# Stage 1: resolve wheels (multi-stage build)
FROM python:3.11-slim AS builder
WORKDIR /wheels
COPY requirements.txt .
RUN pip wheel --no-cache-dir --wheel-dir /wheels -r requirements.txt

# Stage 2: runtime — non-root user
FROM python:3.11-slim AS runtime
RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

RUN useradd --create-home --shell /bin/bash appuser
WORKDIR /app

COPY --from=builder /wheels /wheels
COPY requirements.txt .
RUN pip install --no-cache-dir /wheels/*.whl || true
RUN pip install --no-cache-dir -r requirements.txt
RUN rm -rf /wheels

COPY manage.py .
COPY mysite/ ./mysite/
COPY coreFit/ ./coreFit/

RUN mkdir -p staticfiles media \
    && chown -R appuser:appuser /app

USER appuser
ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# Prefer an unauthenticated GET that exists in this API
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD curl -f http://127.0.0.1:8000/api/membership-plans/ || exit 1

CMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2"]
