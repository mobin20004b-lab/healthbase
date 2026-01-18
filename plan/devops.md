# DevOps & Infrastructure

This document outlines the CI/CD pipeline, deployment strategy, and infrastructure requirements for the Yazd Health Transparency Platform.

## 1. CI/CD Pipeline

We use **GitHub Actions** for our Continuous Integration pipeline. The configuration is defined in `.github/workflows/ci.yml`.

### Workflow Steps
The pipeline runs on every push to `main` and every pull request.

1.  **Setup Bun:** Uses `oven-sh/setup-bun` to set up the Bun runtime.
2.  **Install Dependencies:** Runs `bun install`.
3.  **Database Setup:**
    -   Spins up a PostgreSQL service container.
    -   Runs `bun x prisma generate` to generate the Prisma Client.
4.  **Linting:** Runs `bun run lint` (ESLint) to ensure code quality.
5.  **Type Checking:** Runs `bun x tsc --noEmit` to verify TypeScript types.
6.  **Testing:** Runs `bun run test` to execute unit and integration tests.
7.  **Build Verification:** Runs `bun run build` to ensure the application builds successfully.

### Environment Variables (CI)
The CI environment is configured with the following variables:
-   `DATABASE_URL`: `postgres://postgres:password@localhost:5432/test_db`
-   `NEXTAUTH_SECRET`: `supersecret`
-   `NEXTAUTH_URL`: `http://localhost:3000`

## 2. Deployment Strategy (Pending)

**Status:** Planned [ ]

The production deployment strategy is yet to be finalized. The following options are under consideration:

### Option A: Vercel (Preferred for MVP)
-   **Pros:** Zero-config, built-in CI/CD for deployment, global CDN, serverless functions for API routes.
-   **Cons:** Database needs to be hosted separately (e.g., Supabase, Neon, or Railway).

### Option B: VPS (e.g., Hetzner, DigitalOcean)
-   **Pros:** Lower cost, full control, data residency (if required).
-   **Cons:** Higher maintenance (OS updates, security, Nginx config).
-   **Stack:** Docker Compose (App + Postgres + Caddy/Nginx).

### Infrastructure Requirements
-   **Database:** PostgreSQL 15+ with PostGIS extension.
-   **Runtime:** Node.js 18+ or Bun 1.0+ (if supported by host).
-   **Storage:** Object storage (S3-compatible) for images (future scope).

## 3. Monitoring & Logging (Planned)

-   **Logs:** Console logs captured by platform (Vercel/Docker).
-   **Analytics:** Vercel Analytics or self-hosted solution.
-   **Uptime:** UptimeRobot or similar service.
