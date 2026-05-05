#!/bin/sh
set -e
cd /app
python manage.py migrate --no-input
exec gunicorn mysite.wsgi:application --bind 0.0.0.0:8000 --workers 2
