#!/usr/bin/env bash
set -euo pipefail

echo "Entrypoint: initializing application container"

if [ -z "${DATABASE_URL:-}" ]; then
  echo "Warning: DATABASE_URL is not set. Expect failures when attempting DB operations."
fi

echo "Installing dependencies (bun)..."
bun install --no-save

echo "Generating Prisma client..."
bunx prisma generate --schema=prisma/schema.prisma

if [ "${MIGRATE:-}" = "deploy" ] || [ "${MIGRATE:-}" = "1" ]; then
  echo "Deploying migrations..."
  bunx prisma migrate deploy --schema=prisma/schema.prisma
elif [ "${MIGRATE:-}" = "reset" ]; then
  echo "Resetting database (migrate reset)..."
  bunx prisma migrate reset --force --schema=prisma/schema.prisma
else
  echo "Pushing schema (db push)..."
  bunx prisma db push --schema=prisma/schema.prisma
fi

echo "Seeding database (if seed script exists)..."
# attempt to run seed but continue if it fails
bunx ts-node prisma/seed.ts || echo "Seed script failed or not present; continuing"

echo "Starting application (bun run start)..."
exec bun run start
