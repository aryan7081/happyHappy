#!/bin/bash
# Idempotent deploy script - safe to run multiple times
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Idempotent: mkdir -p creates dir only if not exists
mkdir -p "$PROJECT_ROOT/backend/staticfiles"
mkdir -p "$PROJECT_ROOT/backend/media"

cd "$PROJECT_ROOT/backend"
# Idempotent: migrate applies only pending migrations
python manage.py migrate --no-input
python manage.py collectstatic --no-input --clear

echo "Deploy completed successfully."
