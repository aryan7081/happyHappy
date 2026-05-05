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
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh \
    && mkdir -p staticfiles media \
    && chown -R appuser:appuser /app /usr/local/bin/docker-entrypoint.sh

USER appuser
ENV PYTHONUNBUFFERED=1
EXPOSE 8000

# DB-free liveness URL; start-period allows first-time migrate + gunicorn boot
HEALTHCHECK --interval=30s --timeout=5s --start-period=90s --retries=3 \
  CMD curl -f http://127.0.0.1:8000/api/health/ || exit 1

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
