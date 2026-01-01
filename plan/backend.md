# Backend Implementation Plan

This document outlines the backend implementation tasks for the Yazd Health Transparency Platform MVP.

## Task 1: Foundation Setup

### Steps
1.  Initialize a new Next.js project with TypeScript.
2.  Set up Postgres database (local or cloud).
3.  Initialize Prisma ORM.
4.  Define the initial Prisma schema based on the data model.
5.  Set up NextAuth.js for authentication (Credentials provider).
6.  Implement Role-Based Access Control (RBAC) helpers.

### Checks
- [ ] Next.js project created and running.
- [ ] Postgres database connected.
- [ ] Prisma schema defined and pushed to DB.
- [ ] NextAuth configured and working for basic login.
- [ ] RBAC helpers (`requireRole`) implemented and tested.

### Acceptance Criteria (AC)
-   Project runs without errors.
-   Database tables are created: `User`, `Clinic`, `Service`, `Review`, `Favorite`.
-   Users can register and login.
-   Routes can be protected by role (`admin`, `clinic`, `user`).

### Plan to Docs
-   Update `README.md` with setup instructions.
-   Document the API structure in `docs/api.md`.

### QC
-   Verify database connection strings are secure (env vars).
-   Verify password hashing is implemented (bcrypt/argon2).

### Test Scenario
-   **Scenario 1:** Register a new user. Verify the user exists in the DB with a hashed password.
-   **Scenario 2:** Attempt to access an admin-only route as a regular user. Verify access is denied (403/401).

---

## Task 2: Core Data API (Clinics & Services)

### Steps
1.  Implement `GET /api/clinics` with filters (city, service, specialty, insurance, rating).
2.  Implement `GET /api/clinics/:id` for details.
3.  Implement `POST /api/clinics` (Admin only).
4.  Implement `PUT /api/clinics/:id` (Admin or Owner).
5.  Implement `GET /api/services` and `GET /api/clinics/:id/services`.
6.  Implement `GET /api/search` using Postgres FTS.

### Checks
- [ ] `GET /clinics` returns paginated list.
- [ ] Filters on `GET /clinics` work correctly.
- [ ] `GET /clinics/:id` returns full details including services.
- [ ] Admin can create a clinic.
- [ ] Search returns relevant results.

### Acceptance Criteria (AC)
-   API endpoints match the OpenAPI spec.
-   Search queries return results in < 200ms.
-   Pagination works correctly.

### Plan to Docs
-   Update API documentation with request/response examples.

### QC
-   Check for N+1 query issues in list endpoints.
-   Verify input validation (Zod) for creation/updates.

### Test Scenario
-   **Scenario 1:** Search for "Cardiology" in "Yazd". Verify results include relevant clinics.
-   **Scenario 2:** Create a clinic as Admin. Verify it appears in search results.

---

## Task 3: Reviews & Favorites

### Steps
1.  Implement `POST /api/reviews` (User only).
2.  Implement `GET /api/clinics/:id/reviews`.
3.  Implement `POST /api/favorites` and `DELETE /api/favorites`.
4.  Implement Admin moderation endpoints (`approve`, `reject` reviews).

### Checks
- [ ] User can post a review.
- [ ] Review is created with "pending" status.
- [ ] Admin can approve review.
- [ ] Approved review appears in `GET /reviews`.
- [ ] User can add/remove favorites.

### Acceptance Criteria (AC)
-   Reviews are linked to users and clinics.
-   Users cannot review the same clinic multiple times (if that's the rule, or rate limit).
-   Favorites are persisted.

### Plan to Docs
-   Document the review moderation workflow.

### QC
-   Verify users cannot approve their own reviews.
-   Check for SQL injection vulnerabilities in comments (Prisma handles this, but verify logic).

### Test Scenario
-   **Scenario 1:** User A posts a review. Admin B approves it. User C sees the review on the clinic page.
-   **Scenario 2:** User A adds Clinic X to favorites. User A checks their favorites list and sees Clinic X.

---

## Task 4: Dashboard & Analytics API

### Steps
1.  Implement `GET /api/dashboard/profile` (Clinic Owner).
2.  Implement `PUT /api/dashboard/profile` (Clinic Owner).
3.  Implement `GET /api/dashboard/analytics` (Clinic Owner).
4.  Implement basic tracking for analytics (e.g., increment view count on `GET /clinics/:id`).

### Checks
- [ ] Clinic owner can view their profile data.
- [ ] Clinic owner can update their profile.
- [ ] Analytics endpoint returns correct data structure.
- [ ] View counts increment on page load.

### Acceptance Criteria (AC)
-   Only the assigned clinic owner can access the dashboard.
-   Updates are reflected immediately.

### Plan to Docs
-   Document the analytics data model.

### QC
-   Verify that a clinic owner cannot access another clinic's dashboard.

### Test Scenario
-   **Scenario 1:** Clinic Owner logs in, updates description. Verify change on public page.
-   **Scenario 2:** View a clinic page 5 times. Check analytics endpoint to see if view count increased.
