#!/bin/bash
# Idempotent start script - safe to run multiple times
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$PROJECT_ROOT/backend"
# Idempotent: migrate before start (no-op if already applied)
python manage.py migrate --no-input

echo "Starting server..."
exec gunicorn mysite.wsgi:application --bind 0.0.0.0:8000
