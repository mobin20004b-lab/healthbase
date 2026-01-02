# Backend Development Plan

This document outlines the backend development tasks for the Yazd Health Transparency Platform MVP. The backend is built using Next.js App Router (API Routes), Prisma ORM, and PostgreSQL.

## 1. Project Initialization & Database Setup

- **Task:** Initialize Next.js project and setup Prisma with PostgreSQL.
- **Steps:**
    1.  Initialize a new Next.js project with TypeScript, ESLint, and Tailwind CSS.
    2.  Install `prisma` and `@prisma/client`.
    3.  Initialize Prisma to create `prisma/schema.prisma`.
    4.  Configure PostgreSQL connection string in `.env`.
    5.  Define the initial schema (User, Clinic, Service, Review, etc.) as per the Product Brief.
    6.  Run `prisma migrate dev` to create the initial migration.
    7.  Create a seed script (`prisma/seed.ts`) with dummy data for testing.
- **Checks:**
    - `npx prisma studio` opens and shows the tables.
    - Seed script runs without errors.
    - Database tables match the schema in `product.md`.
- **Acceptance Criteria:**
    - Project builds successfully.
    - Database is reachable.
    - Schema is applied.
- **Plan to Docs:**
    - Update `README.md` with setup instructions.
- **QC:**
    - Verify strict typing in `prisma/schema.prisma`.
- **Test Scenario:**
    - Run `npm run dev` and ensure no DB connection errors.

## 2. Authentication System (NextAuth.js)

- **Task:** Implement Authentication using NextAuth.js. (Done)
- **Steps:**
    1.  Install `next-auth`.
    2.  Configure NextAuth with `CredentialsProvider` (email/password) and JWT strategy.
    3.  Implement password hashing using `bcrypt` or `argon2`.
    4.  Define custom pages for login/register if needed (backend logic only).
    5.  Implement Role-Based Access Control (RBAC) helpers (`isAdmin`, `isClinicOwner`).
    6.  Create API route `/api/auth/register`.
- **Checks:**
    - User can register via API.
    - User can login and receive a session token.
    - Protected routes reject unauthenticated requests.
- **Acceptance Criteria:**
    - Secure password storage.
    - JWT contains user role and ID.
- **Plan to Docs:**
    - Document auth endpoints in `plan/backend.md` or a new API doc.
- **QC:**
    - Check for security vulnerabilities (e.g., logging passwords).
- **Test Scenario:**
    - POST `/api/auth/register` -> 201 Created.
    - POST `/api/auth/login` -> 200 OK (with token).

## 3. Clinic Management API

- **Task:** Create CRUD endpoints for Clinics.
- **Steps:**
    1.  Create `GET /api/clinics` (List with pagination & basic filters).
    2.  Create `GET /api/clinics/[id]` (Detail view).
    3.  Create `POST /api/clinics` (Admin only).
    4.  Create `PUT /api/clinics/[id]` (Admin or Owner).
    5.  Implement ownership verification middleware.
- **Checks:**
    - Admin can create clinics.
    - Public can list clinics.
    - Owner can update their clinic.
- **Acceptance Criteria:**
    - Pagination works.
    - Filters (City, Category) work.
    - Security rules are enforced.
- **Plan to Docs:**
    - Update OpenAPI spec in `product.md` if changed.
- **QC:**
    - Verify input validation (Zod).
- **Test Scenario:**
    - User A (Owner) tries to update User B's clinic -> 403 Forbidden.

## 4. Service & Price Transparency API

- **Task:** Create endpoints for Clinic Services and Prices.
- **Steps:**
    1.  Create `GET /api/clinics/[id]/services`.
    2.  Create `POST /api/services` (Link to clinic).
    3.  Implement price range (`min_price`, `max_price`) and insurance logic.
- **Checks:**
    - Services appear under correct clinic.
    - Price ranges are stored correctly.
- **Acceptance Criteria:**
    - JSON response includes formatted prices.
- **Plan to Docs:**
    - Document data model for Services.
- **QC:**
    - Ensure currency consistency (IRR/Toman).
- **Test Scenario:**
    - Retrieve services for Clinic X and verify price data.

## 5. Reviews & Moderation API

- **Task:** Implement Review submission and moderation workflow.
- **Steps:**
    1.  Create `POST /api/reviews` (Authenticated User).
    2.  Create `GET /api/clinics/[id]/reviews` (Public).
    3.  Create `GET /api/admin/reviews/pending` (Admin).
    4.  Create `PUT /api/admin/reviews/[id]/approve` (Admin).
- **Checks:**
    - Submitted reviews are "pending" by default.
    - Only approved reviews appear in public list.
- **Acceptance Criteria:**
    - Rating (1-5) constraints enforced.
    - One review per user per clinic (optional logic).
- **Plan to Docs:**
    - Document moderation flow.
- **QC:**
    - Check for SQL injection risks in comments.
- **Test Scenario:**
    - Submit review -> Admin approves -> Appears in public list.

## 6. Search Engine (Postgres Full Text Search)

- **Task:** Implement robust search functionality.
- **Steps:**
    1.  Enable `pg_trgm` extension if needed (or use native `tsvector`).
    2.  Create indexes on `name`, `description`, `service.name`.
    3.  Implement search endpoint `/api/search` accepting `q` param.
    4.  Implement filters: `min_rating`, `city`, `insurance`.
- **Checks:**
    - Search returns relevant results.
    - Performance is acceptable (<200ms).
- **Acceptance Criteria:**
    - Supports Persian character normalization (search matches regardless of specific char variants).
- **Plan to Docs:**
    - Document search query parameters.
- **QC:**
    - Test with common typos (fuzzy search if enabled).
- **Test Scenario:**
    - Search "Ghalb" (Heart) -> Returns Cardiology clinics.
