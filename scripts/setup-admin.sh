#!/bin/bash
# Setup admin user for portfolio

# Default values (change these)
SERVER_URL="${SERVER_URL:-http://localhost:3001}"
EMAIL="${1:-admin@example.com}"
PASSWORD="${2:-admin123}"

echo "Creating admin user: $EMAIL"

curl -X POST "$SERVER_URL/api/admin/setup" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASSWORD\"}"

echo ""
echo "Admin created! Login at /admin/login"
