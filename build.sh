#!/bin/bash

set -e

echo "🔨 Building HealthBase..."
echo ""

# Step 1: Check environment
echo "✓ Checking environment..."
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Please create it with the required variables."
    exit 1
fi

# Step 2: Install dependencies if needed
echo "✓ Ensuring dependencies are installed..."
bun install

# Step 3: Generate Prisma types
echo "✓ Generating Prisma types..."
bunx prisma generate

# Step 4: Clear build cache
echo "✓ Clearing build cache..."
rm -rf .next

# Step 5: Run Next.js build
echo "✓ Building Next.js application..."
bun run build

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "To start the development server, run: bun run dev"
echo "To start the production server, run: bun run start"
