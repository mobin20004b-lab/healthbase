Below are **(1) BRD**, **(2) MVP OpenAPI (refactored)**, **(3) Implementation Plan**, and **(4) UI/UX Requirements + UX research** for a **clinic/service transparency & discovery platform** (FA/EN), explicitly **without appointments in MVP**.

The PDF frames the core problem as **healthcare information asymmetry** and notes that local “nearby” solutions are mostly **location/appointment sites** that **don’t provide quality/price/service transparency**, while the goal is to publish information that meaningfully changes patient decisions.  

---

# 1) BRD — Business Requirements Document (MVP)

## 1.1 Background

Patients (and health tourists) have limited, inconsistent information about providers; this creates uncertainty and weak decision-making. 
The PDF indicates Iran lacks a true comparable platform; current sites are mainly mapping or appointment booking and don’t provide structured info about **services, quality, and prices**. 

## 1.2 Business objective

Deliver a public, bilingual transparency platform that:

* Helps users **find and choose** clinics/services confidently
* Creates **trust signals** (verified clinics, moderated reviews)
* Enables clinics to manage their public presence
* Collects usage insights to guide iteration

> The PDF also explicitly suggests later expansion into e-services like appointments, consultation, etc.—we’ll **architect for it**, but **exclude appointments from MVP**. 

## 1.3 Scope (MVP)

### In scope (MVP)

**Public**

* Clinic discovery: list + filter + sort + pagination
* Clinic details: services, contact, address, ratings/reviews
* Services directory + educational content
* Reviews (create + edit own + moderation workflow)
* Favorites (save/unsave clinics)
* Search + suggestions (Postgres-based for MVP)

**Clinic dashboard**

* Edit clinic profile (description, contacts, address, services)
* Basic analytics (views, search appearances)

**Admin**

* Verify/activate clinics
* Moderate flagged reviews
* Basic taxonomy management (optional if seeded)

**Platform**

* i18n: Persian (RTL) + English (LTR)
* Auth + user management + permissions via NextAuth
* Next.js full-stack + Postgres

### Out of scope (MVP)

* Appointments and scheduling (explicit requirement)
* Payments, telemedicine, chat
* Elastic/OpenSearch (defer; MVP uses Postgres FTS)
* File uploads (optional P1 unless you need verification docs)

## 1.4 Stakeholders

* Business owner / sponsor
* Product & UX
* Engineering (Next.js/Postgres)
* Admin/moderation operators
* Clinic operators
* End-users (patients + tourists)

## 1.5 Personas & key journeys

### Patient / local

* Search → filter → compare mentally → clinic detail → contact/map → favorite → review after visit

### Tourist

* English landing → search by service/location → trust cues → contact → save/share

### Clinic operator

* Login → dashboard → update profile/services → check analytics

### Admin

* Review pending clinics → verify → moderate reviews → manage taxonomy

## 1.6 Functional requirements (MVP)

### FR1: Clinic discovery

* Filter: location, service category, specialty, insurance, rating, name
* Sort: name/rating (distance optional)
* Pagination
* SEO-friendly pages

### FR2: Clinic details

* Public profile: description, address, contact, services, specialties, insurance
* Reviews list with scoring breakdown
* “Verified clinic” badge when verified

### FR3: Reviews

* Logged-in user can create review
* User can edit/delete own review (within policy window if desired)
* Review statuses: pending/approved/rejected/flagged
* Admin moderation: approve/reject
* Anti-abuse basics (rate limit, basic profanity filter optional)

### FR4: Services & content

* Service categories list
* Service detail: instructions, required docs, FAQ, price range (if available)
* Educational content per service (FA/EN)

### FR5: Favorites

* Add/remove favorite
* Favorites page

### FR6: Clinic dashboard

* Clinic can edit own profile and services
* Clinic can see basic analytics counters

### FR7: Auth + user & permission management (NextAuth)

* Register/login (credentials)
* Roles: admin, clinic, user (optional editor)
* Role-based access enforcement server-side + UI gating
* Admin can assign “clinic” role to a user and bind to a clinic

## 1.7 Non-functional requirements

* **Security**: OWASP basics, secure sessions, role checks, audit logs (admin actions)
* **Privacy**: minimal PII exposure; moderation safeguards
* **Performance**: fast search/listing; caching for popular pages
* **Accessibility**: WCAG-aware components, keyboard nav
* **i18n/RTL**: full Persian RTL support
* **Observability**: error tracking, request logs, analytics events

## 1.8 Success metrics (MVP)

* Search → clinic detail CTR
* Contact intent (call/email/map clicks)
* Favorite rate
* Review submission rate & approval rate
* # verified clinics, # clinics updating profile

## 1.9 Risks & mitigations

* **Data completeness** → start with curated pilot dataset + “last updated” labels
* **Trust/abuse** → moderation workflow + rate limiting
* **RTL UX issues** → dedicated Persian QA, typography, number formatting
* **Clinic adoption** → simple claim/onboarding flow + admin-assisted setup

---

# 2) MVP OpenAPI (refactored, no appointments)

> This is a **clean MVP API** aligned with Next.js + Postgres + NextAuth.
> Auth is modeled as token-based for API usage (NextAuth JWT strategy), but you can also operate via cookie sessions in web.

```yaml
openapi: 3.0.3
info:
  title: Healthcare Transparency Platform API (MVP)
  version: 0.1.0
  description: >
    MVP API for clinic/service discovery, reviews, favorites, dashboard and admin moderation.
    Appointments are excluded from MVP.

servers:
  - url: https://{host}/api
    variables:
      host:
        default: localhost:3000

tags:
  - name: Auth
  - name: Clinics
  - name: Services
  - name: Reviews
  - name: Favorites
  - name: Content
  - name: Search
  - name: Dashboard
  - name: Admin

paths:
  /auth/register:
    post:
      tags: [Auth]
      summary: Register a new user (Credentials)
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/RegisterRequest" }
      responses:
        "201":
          description: User created
          content:
            application/json:
              schema: { $ref: "#/components/schemas/User" }
        "400": { $ref: "#/components/responses/BadRequest" }

  /auth/login:
    post:
      tags: [Auth]
      summary: Login (returns access token; web may use cookie session)
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/LoginRequest" }
      responses:
        "200":
          description: Logged in
          content:
            application/json:
              schema: { $ref: "#/components/schemas/AuthResponse" }
        "401": { $ref: "#/components/responses/Unauthorized" }

  /clinics:
    get:
      tags: [Clinics]
      summary: List clinics with filters
      parameters:
        - in: query
          name: q
          schema: { type: string }
          description: Full-text query (name, description)
        - in: query
          name: city
          schema: { type: string }
        - in: query
          name: service_category
          schema: { type: string }
        - in: query
          name: specialty
          schema: { type: string }
        - in: query
          name: insurance
          schema: { type: string }
        - in: query
          name: min_rating
          schema: { type: number, minimum: 1, maximum: 5 }
        - in: query
          name: sort
          schema:
            type: string
            enum: [name, rating, newest]
        - in: query
          name: page
          schema: { type: integer, minimum: 1, default: 1 }
        - in: query
          name: limit
          schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
      responses:
        "200":
          description: Paged clinics
          content:
            application/json:
              schema: { $ref: "#/components/schemas/PagedClinics" }

    post:
      tags: [Clinics]
      summary: Create a clinic (Admin)
      security: [{ bearerAuth: [] }]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/ClinicUpsert" }
      responses:
        "201":
          description: Clinic created
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Clinic" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }

  /clinics/{clinicId}:
    get:
      tags: [Clinics]
      summary: Get clinic details
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: Clinic
          content:
            application/json:
              schema: { $ref: "#/components/schemas/ClinicDetail" }
        "404": { $ref: "#/components/responses/NotFound" }

    put:
      tags: [Clinics]
      summary: Update clinic (Admin or owning Clinic)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/ClinicUpsert" }
      responses:
        "200":
          description: Updated
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Clinic" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }
        "404": { $ref: "#/components/responses/NotFound" }

    delete:
      tags: [Clinics]
      summary: Delete clinic (Admin)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "204":
          description: Deleted
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }
        "404": { $ref: "#/components/responses/NotFound" }

  /clinics/{clinicId}/services:
    get:
      tags: [Services]
      summary: List services for a clinic
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: Services
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/Service" }
        "404": { $ref: "#/components/responses/NotFound" }

  /services:
    get:
      tags: [Services]
      summary: List service categories (and optionally services)
      parameters:
        - in: query
          name: category
          schema: { type: string }
      responses:
        "200":
          description: Service categories/services
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/Service" }

  /services/{serviceId}:
    get:
      tags: [Services]
      summary: Get service detail
      parameters:
        - in: path
          name: serviceId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: Service
          content:
            application/json:
              schema: { $ref: "#/components/schemas/ServiceDetail" }
        "404": { $ref: "#/components/responses/NotFound" }

  /content/services/{serviceId}:
    get:
      tags: [Content]
      summary: Get educational content for a service (localized)
      parameters:
        - in: path
          name: serviceId
          required: true
          schema: { type: string, format: uuid }
        - in: query
          name: locale
          schema:
            type: string
            enum: [fa, en]
          required: false
      responses:
        "200":
          description: Content
          content:
            application/json:
              schema: { $ref: "#/components/schemas/ServiceContent" }
        "404": { $ref: "#/components/responses/NotFound" }

  /reviews:
    post:
      tags: [Reviews]
      summary: Create review (User)
      security: [{ bearerAuth: [] }]
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/ReviewCreate" }
      responses:
        "201":
          description: Created
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Review" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "400": { $ref: "#/components/responses/BadRequest" }

  /clinics/{clinicId}/reviews:
    get:
      tags: [Reviews]
      summary: List reviews for clinic
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
        - in: query
          name: page
          schema: { type: integer, minimum: 1, default: 1 }
        - in: query
          name: limit
          schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
      responses:
        "200":
          description: Paged reviews
          content:
            application/json:
              schema: { $ref: "#/components/schemas/PagedReviews" }
        "404": { $ref: "#/components/responses/NotFound" }

  /reviews/{reviewId}:
    put:
      tags: [Reviews]
      summary: Update review (Owner)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: reviewId
          required: true
          schema: { type: string, format: uuid }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/ReviewUpdate" }
      responses:
        "200":
          description: Updated
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Review" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }
        "404": { $ref: "#/components/responses/NotFound" }

    delete:
      tags: [Reviews]
      summary: Delete review (Owner or Admin)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: reviewId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "204": { description: Deleted }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }
        "404": { $ref: "#/components/responses/NotFound" }

  /users/{userId}/favorites:
    get:
      tags: [Favorites]
      summary: List user favorites (Owner)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: userId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: Favorites
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/Clinic" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }

    post:
      tags: [Favorites]
      summary: Add favorite clinic (Owner)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: userId
          required: true
          schema: { type: string, format: uuid }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [clinic_id]
              properties:
                clinic_id: { type: string, format: uuid }
      responses:
        "201": { description: Added }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }
        "404": { $ref: "#/components/responses/NotFound" }

  /users/{userId}/favorites/{clinicId}:
    delete:
      tags: [Favorites]
      summary: Remove favorite (Owner)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: userId
          required: true
          schema: { type: string, format: uuid }
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "204": { description: Removed }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }

  /search:
    get:
      tags: [Search]
      summary: Search clinics (Postgres FTS in MVP)
      parameters:
        - in: query
          name: q
          schema: { type: string }
        - in: query
          name: city
          schema: { type: string }
        - in: query
          name: service_category
          schema: { type: string }
        - in: query
          name: specialty
          schema: { type: string }
        - in: query
          name: insurance
          schema: { type: string }
        - in: query
          name: min_rating
          schema: { type: number, minimum: 1, maximum: 5 }
        - in: query
          name: page
          schema: { type: integer, minimum: 1, default: 1 }
        - in: query
          name: limit
          schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
      responses:
        "200":
          description: Search results
          content:
            application/json:
              schema: { $ref: "#/components/schemas/PagedClinics" }

  /search/suggestions:
    get:
      tags: [Search]
      summary: Autocomplete suggestions (MVP = Postgres trigram)
      parameters:
        - in: query
          name: q
          required: true
          schema: { type: string, minLength: 1 }
        - in: query
          name: locale
          schema:
            type: string
            enum: [fa, en]
      responses:
        "200":
          description: Suggestions
          content:
            application/json:
              schema:
                type: array
                items: { type: string }

  /clinics/{clinicId}/dashboard/profile:
    get:
      tags: [Dashboard]
      summary: Get clinic dashboard profile (Clinic owner)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: Profile
          content:
            application/json:
              schema: { $ref: "#/components/schemas/ClinicDashboardProfile" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }

    put:
      tags: [Dashboard]
      summary: Update clinic dashboard profile (Clinic owner)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
      requestBody:
        required: true
        content:
          application/json:
            schema: { $ref: "#/components/schemas/ClinicDashboardProfileUpdate" }
      responses:
        "200":
          description: Updated
          content:
            application/json:
              schema: { $ref: "#/components/schemas/ClinicDashboardProfile" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }

  /clinics/{clinicId}/dashboard/analytics:
    get:
      tags: [Dashboard]
      summary: Get basic analytics (Clinic owner)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
        - in: query
          name: range
          schema:
            type: string
            enum: [7d, 30d, 90d]
            default: 30d
      responses:
        "200":
          description: Analytics
          content:
            application/json:
              schema: { $ref: "#/components/schemas/ClinicDashboardAnalytics" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }

  /admin/clinics/pending:
    get:
      tags: [Admin]
      summary: List pending clinics (Admin)
      security: [{ bearerAuth: [] }]
      responses:
        "200":
          description: Pending clinics
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/Clinic" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }

  /admin/clinics/{clinicId}/verify:
    put:
      tags: [Admin]
      summary: Verify clinic (Admin)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: clinicId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: Verified
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Clinic" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }
        "404": { $ref: "#/components/responses/NotFound" }

  /admin/reviews/flagged:
    get:
      tags: [Admin]
      summary: List flagged reviews (Admin)
      security: [{ bearerAuth: [] }]
      responses:
        "200":
          description: Flagged reviews
          content:
            application/json:
              schema:
                type: array
                items: { $ref: "#/components/schemas/Review" }
        "401": { $ref: "#/components/responses/Unauthorized" }
        "403": { $ref: "#/components/responses/Forbidden" }

  /admin/reviews/{reviewId}/approve:
    put:
      tags: [Admin]
      summary: Approve review (Admin)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: reviewId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: Approved
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Review" }

  /admin/reviews/{reviewId}/reject:
    put:
      tags: [Admin]
      summary: Reject review (Admin)
      security: [{ bearerAuth: [] }]
      parameters:
        - in: path
          name: reviewId
          required: true
          schema: { type: string, format: uuid }
      responses:
        "200":
          description: Rejected
          content:
            application/json:
              schema: { $ref: "#/components/schemas/Review" }

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  responses:
    BadRequest:
      description: Invalid request
      content:
        application/json:
          schema: { $ref: "#/components/schemas/Error" }
    Unauthorized:
      description: Authentication required
      content:
        application/json:
          schema: { $ref: "#/components/schemas/Error" }
    Forbidden:
      description: Not allowed
      content:
        application/json:
          schema: { $ref: "#/components/schemas/Error" }
    NotFound:
      description: Not found
      content:
        application/json:
          schema: { $ref: "#/components/schemas/Error" }

  schemas:
    Error:
      type: object
      properties:
        error: { type: string }

    RegisterRequest:
      type: object
      required: [email, password, full_name]
      properties:
        email: { type: string, format: email }
        password: { type: string, format: password, minLength: 8 }
        full_name: { type: string, minLength: 2 }

    LoginRequest:
      type: object
      required: [email, password]
      properties:
        email: { type: string, format: email }
        password: { type: string, format: password }

    AuthResponse:
      type: object
      properties:
        token: { type: string }
        user: { $ref: "#/components/schemas/User" }

    User:
      type: object
      properties:
        id: { type: string, format: uuid }
        email: { type: string, format: email }
        full_name: { type: string }
        role:
          type: string
          enum: [admin, clinic, user, editor]

    Address:
      type: object
      properties:
        province: { type: string, nullable: true }
        city: { type: string, nullable: true }
        zone: { type: string, nullable: true }
        address_line: { type: string, nullable: true }
        postal_code: { type: string, nullable: true }

    Clinic:
      type: object
      properties:
        id: { type: string, format: uuid }
        name: { type: string }
        description: { type: string, nullable: true }
        address: { $ref: "#/components/schemas/Address" }
        latitude: { type: number, format: double, nullable: true }
        longitude: { type: number, format: double, nullable: true }
        contact_phone: { type: string, nullable: true }
        contact_email: { type: string, nullable: true }
        status:
          type: string
          enum: [pending, active, inactive]
        verified_at: { type: string, format: date-time, nullable: true }
        average_rating: { type: number, format: float, nullable: true }

    ClinicUpsert:
      type: object
      required: [name, status]
      properties:
        name: { type: string }
        description: { type: string, nullable: true }
        address: { $ref: "#/components/schemas/Address" }
        latitude: { type: number, format: double, nullable: true }
        longitude: { type: number, format: double, nullable: true }
        contact_phone: { type: string, nullable: true }
        contact_email: { type: string, nullable: true }
        status:
          type: string
          enum: [pending, active, inactive]
        specialties:
          type: array
          items: { type: string }
        insurance:
          type: array
          items: { type: string }

    ClinicDetail:
      allOf:
        - $ref: "#/components/schemas/Clinic"
        - type: object
          properties:
            services:
              type: array
              items: { $ref: "#/components/schemas/Service" }

    Service:
      type: object
      properties:
        id: { type: string, format: uuid }
        clinic_id: { type: string, format: uuid }
        name: { type: string }
        category: { type: string }
        description: { type: string, nullable: true }

    ServiceDetail:
      allOf:
        - $ref: "#/components/schemas/Service"
        - type: object
          properties:
            preparation_instructions: { type: string, nullable: true }
            required_documents:
              type: array
              items: { type: string }
            faq:
              type: array
              items:
                type: object
                properties:
                  question: { type: string }
                  answer: { type: string }
            price_range:
              type: object
              properties:
                min: { type: number, format: float, nullable: true }
                max: { type: number, format: float, nullable: true }

    ServiceContent:
      type: object
      properties:
        service_id: { type: string, format: uuid }
        locale:
          type: string
          enum: [fa, en]
        content_html: { type: string }
        faq:
          type: array
          items:
            type: object
            properties:
              question: { type: string }
              answer: { type: string }

    Review:
      type: object
      properties:
        id: { type: string, format: uuid }
        clinic_id: { type: string, format: uuid }
        user_id: { type: string, format: uuid }
        rating: { type: integer, minimum: 1, maximum: 5 }
        comment: { type: string, nullable: true }
        cleanliness_score: { type: integer, minimum: 1, maximum: 5, nullable: true }
        staff_friendliness_score: { type: integer, minimum: 1, maximum: 5, nullable: true }
        waiting_time_score: { type: integer, minimum: 1, maximum: 5, nullable: true }
        overall_experience_score: { type: integer, minimum: 1, maximum: 5, nullable: true }
        verified_visit: { type: boolean, nullable: true }
        status:
          type: string
          enum: [pending, approved, rejected, flagged]
        created_at: { type: string, format: date-time }

    ReviewCreate:
      type: object
      required: [clinic_id, rating]
      properties:
        clinic_id: { type: string, format: uuid }
        rating: { type: integer, minimum: 1, maximum: 5 }
        comment: { type: string }
        cleanliness_score: { type: integer, minimum: 1, maximum: 5 }
        staff_friendliness_score: { type: integer, minimum: 1, maximum: 5 }
        waiting_time_score: { type: integer, minimum: 1, maximum: 5 }
        overall_experience_score: { type: integer, minimum: 1, maximum: 5 }

    ReviewUpdate:
      type: object
      properties:
        rating: { type: integer, minimum: 1, maximum: 5 }
        comment: { type: string }
        cleanliness_score: { type: integer, minimum: 1, maximum: 5 }
        staff_friendliness_score: { type: integer, minimum: 1, maximum: 5 }
        waiting_time_score: { type: integer, minimum: 1, maximum: 5 }
        overall_experience_score: { type: integer, minimum: 1, maximum: 5 }

    PagedClinics:
      type: object
      properties:
        items:
          type: array
          items: { $ref: "#/components/schemas/Clinic" }
        total: { type: integer }
        page: { type: integer }
        limit: { type: integer }

    PagedReviews:
      type: object
      properties:
        items:
          type: array
          items: { $ref: "#/components/schemas/Review" }
        total: { type: integer }
        page: { type: integer }
        limit: { type: integer }

    ClinicDashboardProfile:
      type: object
      properties:
        description: { type: string, nullable: true }
        contact_phone: { type: string, nullable: true }
        contact_email: { type: string, nullable: true }
        address: { $ref: "#/components/schemas/Address" }
        services:
          type: array
          items: { $ref: "#/components/schemas/Service" }

    ClinicDashboardProfileUpdate:
      type: object
      properties:
        description: { type: string }
        contact_phone: { type: string }
        contact_email: { type: string }
        address: { $ref: "#/components/schemas/Address" }
        services:
          type: array
          items:
            type: object
            properties:
              id: { type: string, format: uuid, nullable: true }
              name: { type: string }
              category: { type: string }
              description: { type: string, nullable: true }

    ClinicDashboardAnalytics:
      type: object
      properties:
        profile_views: { type: integer }
        search_appearances: { type: integer }
        popular_services:
          type: array
          items:
            type: object
            properties:
              service_id: { type: string, format: uuid }
              count: { type: integer }
```

---

# 3) Implementation plan (Next.js + Postgres + NextAuth)

The PDF’s sample plan includes phases like team setup, UI design, data gathering, implementation, marketing. 
Below is an engineering-ready MVP plan aligned with your constraints.

## 3.1 Architecture decisions (MVP)

* **Next.js App Router** (frontend + API route handlers)
* **Postgres + Prisma**
* **NextAuth** (Credentials provider initially)
* **RBAC** enforced on server:

  * `admin`, `clinic`, `user` (+ optional `editor`)
* Search MVP:

  * Postgres Full Text Search + trigram suggestions
* i18n:

  * `next-intl` + `/fa` & `/en` routes, RTL support

## 3.2 Workstreams & tasks

### Workstream A — Foundation (P0)

* Repo scaffolding (lint/test/CI)
* Prisma schema + migrations
* Seed scripts (service categories, insurance, cities)
* NextAuth:

  * user table, password hashing, session strategy
  * role in session token
* Authorization helpers:

  * `requireRole()`, `requireClinicOwnership(clinicId)`

### Workstream B — Public product (P0)

* Pages:

  * Landing
  * Clinics list/search
  * Clinic detail
  * Services list/detail
  * Service educational content
* API:

  * `/clinics` list + detail
  * `/search`, `/search/suggestions`
* SEO:

  * metadata, sitemap, robots

### Workstream C — Reviews & favorites (P0)

* Reviews:

  * create/update/delete
  * statuses + moderation fields
* Favorites:

  * add/remove/list

### Workstream D — Clinic dashboard (P0)

* Claim/assignment model:

  * admin binds `userId → clinicId`
* Dashboard profile update
* Services management for a clinic (simple CRUD)
* Analytics counters (daily table)

### Workstream E — Admin console (P0)

* Pending clinics list
* Verify clinic action
* Flagged reviews list + approve/reject
* Audit log for admin actions

### Workstream F — i18n & RTL QA (P0)

* Translation keys coverage
* Persian typography + RTL layout testing
* Locale-specific formatting (numbers/dates)

## 3.3 Database (Prisma-level outline)

Core tables:

* `User(id, email, fullName, role, status, passwordHash, createdAt)`
* `Clinic(id, name, description, status, verifiedAt, contact..., lat/lng, city...)`
* `Service(id, clinicId, name, category, description, ...)`
* `ServiceContent(id, serviceId, locale, html, faqJson)`
* `Review(id, clinicId, userId, rating, subscores..., status, createdAt)`
* `Favorite(userId, clinicId, createdAt)`
* `ClinicUser(userId, clinicId)` (ownership mapping)
* `AnalyticsDaily(clinicId, date, profileViews, searchAppearances)`
* `AuditLog(actorUserId, action, entityType, entityId, payload, createdAt)`

## 3.4 Security & quality gates

* Rate limiting on login, review create, suggestions endpoint
* Input validation (zod)
* Audit logs for admin actions
* Tests:

  * unit tests for permission guards
  * integration tests for key endpoints (clinics list, review create)

---

# 4) UI/UX requirements (search-focused, modern, minimal animation) + UX research

## 4.1 Visual style (simple, modern)

* Clean typography, generous whitespace, clear hierarchy
* Minimal animation:

  * only subtle hover/focus states
  * short fade for page transitions optional (can be off for “prefers-reduced-motion”)
* Consistent card system (clinic cards, service cards)
* Soft elevation/shadow (light), rounded corners (medium)

## 4.2 i18n & RTL rules (must-have)

* Persian locale:

  * `dir="rtl"` for `/fa/*`
  * RTL-safe components (tabs, pagination, breadcrumbs)
* English locale:

  * `dir="ltr"`
* Locale toggler visible in header
* Numerals:

  * allow Persian digits in FA UI (or keep Latin but be consistent)
* Fonts:

  * Persian-friendly font for FA, neutral sans for EN

## 4.3 Search (Reash) UX requirements — the core screen

This is the most important flow because the product’s value is making provider info **discoverable and comparable**, not appointment booking. 

### Search entry points

* Global search bar in header (sticky on mobile as user scrolls)
* Landing search module with:

  * input + “city” selector
  * quick chips for common categories (dentistry, cardiology, …)

### Results page layout

* **Mobile-first**
* Top: search bar + filter button
* Filters in:

  * mobile: bottom sheet / full-screen panel
  * desktop: left sidebar
* Results area:

  * cards with key trust info: rating, verified badge, top categories, location, quick actions (call, map, favorite)

### Required filters (MVP)

* City/area
* Service category
* Specialty
* Insurance
* Rating (min)
* Sort (name/rating/newest)

### Result card content (MVP)

* Clinic name
* Verified badge (if verified)
* Avg rating + count
* Address snippet + distance (optional later)
* Top services/specialties (max 2–3)
* Buttons: View, Favorite, Call/Email, Map

### Clinic detail page

* Above the fold:

  * name + verified + rating
  * primary action buttons (call/map)
* Sections:

  * About, Services, Insurance, Reviews
* Reviews:

  * distribution summary + recent reviews
  * “Write review” CTA

### Performance UX

* Skeleton loaders (no heavy animations)
* Prefetch clinic detail route on hover (desktop)

## 4.4 Forms UX (auth, reviews, dashboard)

* Auth:

  * clear error messages, password rules
* Review form:

  * structured scores (simple sliders or 1–5 chips)
  * comment optional but encouraged
* Dashboard:

  * autosave avoided (explicit save)
  * field validation inline
  * bilingual content fields (optional): FA required, EN optional

## 4.5 Accessibility requirements

* Keyboard navigation for filters, pagination
* Focus states visible
* ARIA for modal/filter panels
* Respect `prefers-reduced-motion`

## 4.6 UX research (lightweight MVP plan)

The PDF positions this as a transparency product affecting patient decisions. 
Minimum research to de-risk:

* 5 Persian usability tests (search → clinic detail → contact)
* 3 English usability tests (tourist flow)
* 2 clinic-operator tests (dashboard profile editing)
* Instrumentation after launch:

  * search-to-detail CTR, call/map clicks, favorites, review create

---

If you want the next step, I can also generate:

* a **DB schema (Prisma)** that exactly matches this MVP OpenAPI,
* a **route map** (Next.js folders + API handlers),
* and **UI wireframe checklist** (screen-by-screen acceptance criteria).








Based on the provided proposal PDF (focused on the Yazd Health Transparency System) and the OpenAPI specification, I have prepared a comprehensive Product Brief and Technical Plan for the MVP.

Per your instructions, the **Appointments** feature has been removed to focus entirely on **Transparency** (Price, Quality, Service Details), the backend has been migrated to **Next.js**, and the documentation is structured into specific Markdown files.

Here is the complete documentation set.

---

# File 1: Product Brief (MVP)

## 1. Executive Summary

**Project Name:** Yazd Health Transparency Platform (YHTP) - MVP


**Vision:** To democratize access to healthcare information in Yazd Province by eliminating information asymmetry between patients and providers.
**Core Value Proposition:** A bilingual (Persian/English) portal allowing patients and medical tourists to search, compare prices, and view quality metrics of healthcare services without the pressure of immediate booking.

## 2. Problem Statement

As highlighted in the proposal, the current healthcare system suffers from "Information Asymmetry". Patients lack access to reliable data regarding:

* 
**Price:** Variation in costs for identical procedures (e.g., C-sections).


* 
**Quality:** Lack of verifiable performance data leading to reliance on rumors.


* **Service Details:** Unknown preparation requirements or recovery times.

## 3. MVP Scope (The "Transparency Engine")

The MVP focuses strictly on **Information Display and Decision Support**. Appointment booking is **out of scope**.

### Included Features

1. **Comprehensive Clinic Profiles:** Location, contact, accreditation, and photos.
2. 
**Service Transparency:** Detailed breakdown of medical services, **Price Ranges**, insurance coverage, and required documents.


3. 
**Quality Metrics:** Patient reviews and star ratings (Cleanliness, Staff, Waiting Time).


4. **Advanced Search:** Search by symptom, service, price range, and location.
5. 
**Educational Content:** "Service Content" pages to educate patients on procedures (Risk factors, After-care).


6. 
**i18n Support:** Full Persian (RTL) and English (LTR) support to cater to locals and health tourists.



### Excluded Features (Post-MVP)

* Appointment Booking / Scheduling.
* Telemedicine / Chat.
* E-Prescriptions.

## 4. User Roles

1. **Guest:** Search, view details, switch language.
2. **Patient (Registered):** Write reviews, save favorites, view history.
3. **Clinic Manager:** Manage clinic profile, update prices/services, respond to reviews.
4. **System Admin:** Verify clinics, moderate reviews, manage users.

---

# File 2: Technical Architecture & Stack

## 1. High-Level Stack

* **Frontend & Backend Framework:** Next.js 14+ (App Router).
* *Reasoning:* Unified codebase, excellent SEO (crucial for transparency), built-in API routes replace the need for a separate Golang backend.


* **Database:** PostgreSQL.
* *Reasoning:* Robust relational data handling for clinics/services.


* **ORM:** Drizzle ORM or Prisma (Drizzle recommended for performance).
* **Authentication:** NextAuth.js (v5).
* **Search Engine:** PostgreSQL Full Text Search (pg_search) for MVP.
* *Note:* Switched from Elasticsearch to Postgres for MVP simplicity and lower cost, as Postgres handles text search well for <100k records.


* **Internationalization:** `next-intl`.
* **Map Services:** Leaflet (OpenStreetMap) or Neshan (for better Iranian context).

## 2. Infrastructure

* **Containerization:** Docker.
* **CI/CD:** GitHub Actions.
* **Storage:** S3-compatible storage (MinIO or AWS) for clinic images/documents.

---

# File 3: UI/UX Research Plan

## 1. Research Objectives

To validate that the transparency data provided actually reduces patient anxiety and "fear"  regarding medical decisions.

## 2. Target Personas

* **Persona A: The Anxious Parent (Local).** Concerned about C-section risks and costs. Needs reassurance via quality ratings.
* **Persona B: The Medical Tourist.** Non-Persian speaker. Needs clear English pricing, location data, and insurance acceptance info.

## 3. Research Methods (Pre-Dev)

* 
**Competitor Analysis:** Deep dive into `Nobat.ir` (what data is missing?) and `NHS.uk` (how is data presented?).


* **Card Sorting:** Ask users to rank information importance (e.g., Is "Price" more important than "Wait Time"?).

## 4. Usability Testing (During Dev)

* **Task:** "Find the cheapest clinic for an MRI in Yazd that accepts Tamin Ejtemaei insurance."
* **Metric:** Time to completion and Success rate.

## 5. UI Requirements

* **RTL/LTR Switcher:** Seamless toggling without page reload.
* **Trust Signals:** Verified badges for clinics that submitted official price lists.
* **Mobile First:** 80% of traffic expected via mobile.

---

# File 4: Feature Specifications & Roadmap

## Phase 1: Foundation (Weeks 1-3)

### Task 1.1: Project Setup

* Initialize Next.js repo with TypeScript.
* Setup Postgres DB and Drizzle/Prisma.
* Configure `next-intl` for fa/en.

### Task 1.2: User Management (Auth)

* **Feature:** Registration/Login via Email/Password.
* **Feature:** RBAC Middleware.
* `ADMIN`: Full access.
* `CLINIC_ADMIN`: Can edit own `clinic_id` data.
* `USER`: Can review.



## Phase 2: Core Data Structure (Weeks 4-6)

### Task 2.1: Clinic Management

* **CRUD:** Admin creates Clinic. Clinic Admin updates profile (Address, Phone, Description).
* **File Upload:** Clinic logo and license upload.

### Task 2.2: Service Catalogue

* **Data Model:** Services linked to Clinics.
* **Fields:** Name, Category, **Price Range (Min/Max)**, Insurance Coverage.
* **Context:** Add "Service Content" (FAQ, Preparation) per service type.

## Phase 3: Public Interface & Search (Weeks 7-9)

### Task 3.1: Public Clinic Profile

* Display details, map location, and service list with prices.
* **Transparency Highlight:** Clear "Estimated Cost" section.

### Task 3.2: Search Engine

* Implement Postgres Full Text Search.
* Filters: Location, Price Range, Insurance, Specialty.

## Phase 4: Social Proof & Launch (Weeks 10-12)

### Task 4.1: Reviews System

* **Input:** User submits Rating (1-5) + Comment.
* 
**Specific Metrics:** Cleanliness, Staff Behavior.


* **Moderation:** Admin approval queue (to prevent defamation).

### Task 4.2: Dashboarding

* **Clinic Dashboard:** View profile hits, most viewed services (Analytics).

---

# File 5: Refactored OpenAPI Specification

This specification removes appointments, cleans up Golang specific tags, and focuses on the Transparency MVP.

```yaml
openapi: 3.0.0
info:
  title: Yazd Health Transparency Platform API
  version: 1.0.0
  description: API for searching clinics, viewing prices, and transparent quality metrics.
servers:
  - url: http://localhost:3000/api/v1
    description: Next.js API Routes
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    # --- USERS ---
    User:
      type: object
      properties:
        id:
          type: string
          format: uuid
        email:
          type: string
          format: email
        full_name:
          type: string
        role:
          type: string
          enum: [user, clinic_admin, admin]

    # --- CLINICS ---
    Clinic:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: object
          properties:
            en: { type: string }
            fa: { type: string }
          description: "Localized Name"
        description:
          type: object
          properties:
            en: { type: string }
            fa: { type: string }
        address:
          $ref: "#/components/schemas/Address"
        contact_info:
          type: object
          properties:
            phone: { type: string }
            website: { type: string }
        verification_status:
          type: string
          enum: [pending, verified, rejected]
        average_rating:
          type: number
          format: float
        
    Address:
      type: object
      properties:
        province: { type: string, default: "Yazd" }
        city: { type: string }
        street_address: 
          type: object
          properties:
            en: { type: string }
            fa: { type: string }
        coordinates:
          type: object
          properties:
            lat: { type: number }
            lng: { type: number }

    # --- SERVICES (The Transparency Core) ---
    Service:
      type: object
      properties:
        id:
          type: string
          format: uuid
        clinic_id:
          type: string
          format: uuid
        name:
          type: object
          properties:
            en: { type: string }
            fa: { type: string }
        category:
          type: string
        price_transparency:
          type: object
          properties:
            min_price: { type: number }
            max_price: { type: number }
            currency: { type: string, default: "IRR" }
            insurance_accepted: 
              type: array
              items: { type: string }
        educational_content:
          $ref: "#/components/schemas/ServiceContent"

    ServiceContent:
      type: object
      description: "Educational info to help patients understand the procedure"
      properties:
        preparation_steps: { type: string }
        recovery_time: { type: string }
        risks: { type: string }
        
    # --- REVIEWS ---
    Review:
      type: object
      properties:
        id:
          type: string
          format: uuid
        clinic_id:
          type: string
          format: uuid
        user_id:
          type: string
          format: uuid
        overall_rating:
          type: integer
          min: 1
          max: 5
        metrics:
          type: object
          properties:
            cleanliness: { type: integer }
            staff_behavior: { type: integer }
            waiting_time: { type: integer }
        comment:
          type: string
        is_verified_visit:
          type: boolean
          description: "If the system can verify they actually visited (future proofing)"
        status:
          type: string
          enum: [pending, approved, rejected]

paths:
  # --- AUTH ---
  /auth/register:
    post:
      summary: Register new user
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                email: { type: string }
                password: { type: string }
                full_name: { type: string }
      responses:
        "201": { description: Created }

  /auth/login:
    post:
      summary: Login
      responses:
        "200": { description: Returns JWT }

  # --- CLINICS (PUBLIC) ---
  /clinics:
    get:
      summary: Search and List Clinics
      parameters:
        - in: query
          name: search
          schema: { type: string }
          description: Text search for name or service
        - in: query
          name: city
          schema: { type: string }
        - in: query
          name: min_rating
          schema: { type: integer }
      responses:
        "200":
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Clinic"

  /clinics/{id}:
    get:
      summary: Get Clinic Details
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Clinic"

  /clinics/{id}/services:
    get:
      summary: Get Services and Prices for a Clinic
      responses:
        "200":
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Service"

  /clinics/{id}/reviews:
    get:
      summary: Get Public Reviews
      responses:
        "200":
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Review"

  # --- SECURED ROUTES ---
  /reviews:
    post:
      summary: Post a review
      security: [{ bearerAuth: [] }]
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Review"
      responses:
        "201": { description: Pending approval }

  # --- ADMIN / CLINIC MANAGEMENT ---
  /admin/clinics:
    post:
      summary: Create Clinic (Admin only)
      security: [{ bearerAuth: [] }]
    
  /dashboard/my-clinic:
    put:
      summary: Update my clinic details (Clinic Admin)
      security: [{ bearerAuth: [] }]
    get:
      summary: Get Analytics (Views, Search Appearances)
      security: [{ bearerAuth: [] }]

  /dashboard/my-clinic/services:
    post:
      summary: Add/Update Service Pricing
      security: [{ bearerAuth: [] }]

```

---

# File 6: Database Schema Plan (Postgres/Drizzle)

To support the Next.js migration, the database schema is designed as follows:

```sql
-- ENUMS
CREATE TYPE "user_role" AS ENUM ('admin', 'clinic_admin', 'user');
CREATE TYPE "verification_status" AS ENUM ('pending', 'verified', 'rejected');

-- USERS
CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "email" text UNIQUE NOT NULL,
  "password_hash" text NOT NULL,
  "full_name" text,
  "role" user_role DEFAULT 'user',
  "created_at" timestamp DEFAULT now()
);

-- CLINICS
CREATE TABLE "clinics" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "manager_id" uuid REFERENCES "users"("id"), -- Link to the clinic admin
  "name_en" text NOT NULL,
  "name_fa" text NOT NULL,
  "description_en" text,
  "description_fa" text,
  "phone" text,
  "address_json" jsonb, -- Stores flexible address data
  "location" point, -- Postgres geometric type for basic geo search
  "status" verification_status DEFAULT 'pending',
  "created_at" timestamp DEFAULT now()
);

-- SERVICES
CREATE TABLE "services" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "clinic_id" uuid REFERENCES "clinics"("id") ON DELETE CASCADE,
  "name_en" text NOT NULL,
  "name_fa" text NOT NULL,
  "price_min" numeric(12, 2),
  "price_max" numeric(12, 2),
  "insurance_accepted" text[], -- Array of strings
  "educational_content_html_en" text,
  "educational_content_html_fa" text,
  "created_at" timestamp DEFAULT now()
);

-- REVIEWS
CREATE TABLE "reviews" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "clinic_id" uuid REFERENCES "clinics"("id") ON DELETE CASCADE,
  "user_id" uuid REFERENCES "users"("id") ON DELETE SET NULL,
  "rating_cleanliness" int CHECK (rating_cleanliness BETWEEN 1 AND 5),
  "rating_staff" int CHECK (rating_staff BETWEEN 1 AND 5),
  "rating_overall" int CHECK (rating_overall BETWEEN 1 AND 5),
  "comment" text,
  "is_approved" boolean DEFAULT false, -- Moderation
  "created_at" timestamp DEFAULT now()
);

```