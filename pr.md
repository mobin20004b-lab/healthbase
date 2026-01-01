Here is the comprehensive documentation package for the **Yazd Health Transparency Platform MVP**.

These documents are structured as if they were in a `docs/` folder in your repository. They incorporate the specific constraints (Next.js, Vault, Postgres, No Appointments) and the requirements from the provided proposal PDF.

---

### File: `00_Product_Brief_MVP.md`

```markdown
# Product Brief: Yazd Health Transparency Platform (MVP)

## 1. Executive Summary
[cite_start]The Yazd Health Transparency Platform is a "Decision Support System" designed to solve the problem of information asymmetry in the healthcare market[cite: 24, 28]. [cite_start]Currently, patients rely on rumors rather than data to choose providers[cite: 34]. [cite_start]This MVP aims to empower patients—both local residents and health tourists—to make informed choices based on price, quality, and service availability[cite: 10, 72].

**Status:** MVP (Minimum Viable Product)
**Core Constraint:** No direct booking/appointment system in this phase. Focus is strictly on transparency and discovery.

## 2. Problem Statement
* [cite_start]**Information Asymmetry:** Patients lack data on quality and price, leading to induced demand and potential corruption[cite: 24].
* [cite_start]**Economic Anxiety:** Uncertainty about costs (e.g., C-section prices) causes significant stress for families[cite: 38, 41].
* [cite_start]**Lack of Centralization:** Existing solutions are fragmented (urban directories) or focus only on booking without quality data[cite: 70, 126].

## 3. Target Audience
1.  [cite_start]**Residents of Yazd:** Looking for reliable, cost-effective care and insurance coverage information[cite: 107].
2.  [cite_start]**Health Tourists:** Non-native patients needing detailed facility info, language support, and trust verification[cite: 72].
3.  [cite_start]**Healthcare Providers:** Clinics seeking to showcase their quality and differentiate from competitors[cite: 108].

## 4. MVP Scope & Objectives
The MVP focuses on **Decision Support** rather than **Transaction**.

| In Scope (MVP) | Out of Scope (MVP) |
| :--- | :--- |
| **Comprehensive Profiles:** Staff, Equipment, Prices, Insurance. | **Appointment Booking:** Real-time scheduling is deferred. |
| **Search Engine:** Filter by specialty, price range, location. | **Telemedicine:** Online video consultations. |
| **Transparency Data:** Price ranges (min/max), insurance lists. | **Payment Gateway:** Online payments. |
| **Feedback Loop:** User reviews and ratings (Moderated). | **E-Prescriptions:** Pharmacy integration. |
| **Inquiry System:** "Request Info" button (Lead Gen). | |

## 5. Success Metrics
* **Coverage:** % of Yazd clinics onboarded with verified profiles.
* **Engagement:** Average time on page (indicating consumption of educational content).
* **Leads:** Number of "Inquiry" forms submitted to clinics.

```

---

### File: `01_Technical_Architecture.md`

```markdown
# Technical Architecture

## 1. Stack Overview
* **Frontend & Backend:** Next.js 14+ (App Router). utilizing Server Components for SEO and performance.
* **Database:** PostgreSQL (Relation data for clinics, services, reviews).
* **ORM:** Prisma (Type-safe database access).
* **Security & Secrets:** HashiCorp Vault.
* **Search:** PostgreSQL `tsvector` (Full Text Search) for MVP.
* **Infrastructure:** Dockerized containers.

## 2. System Design Diagram
[User Browser] --(HTTPS)--> [Next.js App Router]
                                    |
        +---------------------------+---------------------------+
        |                           |                           |
   [Prisma ORM]             [Vault Client]              [Search Logic]
        |                           |                           |
   [Postgres DB]            [HashiCorp Vault]           [Postgres FTS]
                            (Secrets, RBAC, Keys)

## 3. Key Decisions
* **Next.js Monorepo:** We removed Golang to simplify the stack. Next.js handles API routes (`/api/...`) and frontend rendering. This reduces context switching and simplifies type sharing (TypeScript everywhere).
* **Vault for Identity:** Instead of simple JWTs stored in `.env`, we use Vault to manage the signing keys and role definitions. This prepares the system for high-security healthcare compliance (HIPAA/GDPR equivalent) from day one.
* **No Booking Engine:** This drastically simplifies the schema. We do not need complex time-slot locking or calendar management.

```

---

### File: `02_Roadmap_and_Features.md`

```markdown
# Feature Breakdown & Roadmap

## Epic 1: Internationalization & Core Setup
* **Task 1.1:** Setup Next.js with `next-intl`.
    * *Requirement:* Detect browser locale. Support `/fa` (RTL) and `/en` (LTR) routes.
* **Task 1.2:** Layout Implementation.
    * *Requirement:* Create responsive shell. Persian font integration (e.g., Vazirmatn).

## Epic 2: Authentication & User Management (Vault Backed)
* **Task 2.1:** Vault Integration.
    * *Requirement:* Configure Vault `userpass` or OIDC auth method. Store DB credentials in Vault KV.
* **Task 2.2:** Registration Flow.
    * *Requirement:* Users register as "Patient" or "Clinic Manager".
* **Task 2.3:** RBAC Middleware.
    * *Requirement:* Next.js Middleware to check user roles against Vault policies before rendering Admin routes.

## Epic 3: Clinic Profiles (The Transparency Engine)
* **Task 3.1:** Clinic Data Model.
    * *Requirement:* Store Name, Address (Geo), Contacts, Description.
* **Task 3.2:** Service Catalog & Pricing.
    * [cite_start]*Requirement:* Instead of a flat list, services have `min_price`, `max_price`, and `insurance_coverage` arrays[cite: 32, 38].
* **Task 3.3:** Equipment & Facilities.
    * [cite_start]*Requirement:* List available tech (MRI, CT) to signal quality[cite: 24].

## Epic 4: Search & Discovery
* **Task 4.1:** Filtering Engine.
    * *Requirement:* Filter by "Accepted Insurance" (Crucial for locals) and "English Speaking" (Crucial for tourists).
* **Task 4.2:** Geo-Search.
    * *Requirement:* "Clinics Near Me" using PostGIS.

## Epic 5: Feedback & Decision Support
* **Task 5.1:** Review System.
    * *Requirement:* Users rate: Cleanliness, Staff, Waiting Time.
* **Task 5.2:** Inquiry Form (The MVP "Booking").
    * *Requirement:* A simple form: "I am interested in X service, please contact me." Saves to DB and emails the clinic.

```

---

### File: `03_UI_UX_Research_Plan.md`

```markdown
# UI/UX Research Plan

## 1. Research Objectives
* Determine the primary "Trust Signals" for Iranian patients vs. International tourists.
* Validate the navigation structure for medical taxonomies (e.g., do users search for "Heart" or "Cardiology"?).
* Ensure the "Price Transparency" display reduces anxiety rather than increasing confusion.

## 2. User Personas

### Persona A: The Anxious Parent (Yazd Local)
* **Demographic:** 30-45 years old, middle income.
* **Goal:** Needs a C-Section or pediatric surgery.
* **Pain Point:** Fear of hidden costs and "under-the-table" fees. [cite_start]Worried about hospital hygiene[cite: 41, 47].
* **Needs:** Clear price list, insurance acceptance (Tamin Ejtemaei), peer reviews on cleanliness.

### Persona B: The Health Tourist (from Gulf/Neighbors)
* **Demographic:** High income relative to local currency.
* **Goal:** Cosmetic surgery or complex treatment (Infertility).
* **Pain Point:** Language barrier, fear of being scammed, lack of after-care info.
* **Needs:** English interface, "Concierge" badge, Verified Doctor credentials.

## 3. Research Methods

### A. Card Sorting (Information Architecture)
* **Activity:** Give users 30 medical services. Ask them to group them.
* **Goal:** Organize the Mega-Menu. (e.g., Does "Rhinoplasty" go under "Surgery" or "Beauty"?).

### B. Comprehension Testing (Transparency Data)
* **Activity:** Show a clinic profile with a price range "5M - 15M Tomans".
* **Question:** "Why do you think the price varies?"
* **Goal:** Ensure users understand the variable factors (Room type, Doctor rank) so they don't feel cheated.

### C. Accessibility Audit
* **Visual:** High contrast for elderly users (common in healthcare).
* **Technical:** Performance test on slow mobile networks (3G/4G is common for users in transit).

```

---

### File: `04_Data_Schema_Prisma.md`

```markdown
# Data Schema (Prisma)

This replaces the Golang Structs. It focuses on the MVP requirements (Inquiries instead of Appointments).

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  ADMIN
  CLINIC_MANAGER
  PATIENT
}

enum InquiryStatus {
  PENDING
  CONTACTED
  CLOSED
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // In real app, hash this or use Vault for auth verification
  fullName  String
  role      Role     @default(PATIENT)
  reviews   Review[]
  inquiries Inquiry[]
  createdAt DateTime @default(now())
}

model Clinic {
  id             String    @id @default(uuid())
  name           String
  description    String?   @db.Text
  // Location
  address        String
  city           String
  latitude       Float
  longitude      Float
  
  // Contact
  phone          String
  website        String?
  
  // Meta
  isVerified     Boolean   @default(false)
  services       Service[]
  reviews        Review[]
  inquiries      Inquiry[]
  
  // Transparency Data
  insurancesAccepted String[] // Array of strings: ["Tamin", "Asia"]
  specialties        String[]
  
  createdAt      DateTime  @default(now())
}

model Service {
  id              String  @id @default(uuid())
  clinicId        String
  clinic          Clinic  @relation(fields: [clinicId], references: [id])
  name            String
  category        String  // e.g. "Surgery", "Checkup"
  description     String?
  
  // Transparency Fields
  priceMin        Decimal?
  priceMax        Decimal?
  currency        String   @default("IRR")
  waitingTimeAvg  String?  // e.g. "2 weeks"
  
  // Educational Content
  preparationInfo String?  @db.Text
  recoveryInfo    String?  @db.Text
}

model Review {
  id          String   @id @default(uuid())
  clinicId    String
  clinic      Clinic   @relation(fields: [clinicId], references: [id])
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  rating      Int      // 1-5 Overall
  cleanliness Int      // 1-5
  staff       Int      // 1-5
  comment     String?
  
  isApproved  Boolean  @default(false) // Admin moderation
  createdAt   DateTime @default(now())
}

// REPLACES APPOINTMENT MODEL
model Inquiry {
  id          String        @id @default(uuid())
  clinicId    String
  clinic      Clinic        @relation(fields: [clinicId], references: [id])
  userId      String
  user        User          @relation(fields: [userId], references: [id])
  
  serviceInterest String?
  message         String
  contactMethod   String        // "Phone", "WhatsApp"
  status          InquiryStatus @default(PENDING)
  
  createdAt     DateTime      @default(now())
}

```

```

---

### File: `05_Refactored_API_Spec.yaml`

```yaml
openapi: 3.0.0
info:
  title: Yazd Health Transparency API (MVP)
  version: 1.0.0
  description: Refactored for Next.js/Vault. Appointments removed. Inquiry system added.
servers:
  - url: /api/v1
paths:
  # --- AUTH ---
  /auth/register:
    post:
      summary: Register User
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/RegisterRequest"
      responses:
        "201":
          description: Created
  
  # --- CLINICS ---
  /clinics:
    get:
      summary: Search and Filter Clinics
      parameters:
        - name: q
          in: query
          schema:
            type: string
          description: Search text (Name, Specialty)
        - name: insurance
          in: query
          schema:
            type: string
          description: Filter by accepted insurance
        - name: price_max
          in: query
          schema:
            type: number
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
      summary: Get Clinic Details (Transparency Profile)
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        "200":
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/ClinicDetail"

  # --- INQUIRY (Replaces Appointment) ---
  /clinics/{id}/inquiry:
    post:
      summary: Send a lead/question to the clinic
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                message:
                  type: string
                service_id:
                  type: string
                contact_preference:
                  type: string
                  enum: [phone, whatsapp, email]
      responses:
        "201":
          description: Inquiry Sent

  # --- REVIEWS ---
  /clinics/{id}/reviews:
    post:
      summary: Submit a review
      security:
        - bearerAuth: []
      requestBody:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/ReviewSubmission"
      responses:
        "201":
          description: Review submitted for moderation

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    Clinic:
      type: object
      properties:
        id: {type: string}
        name: {type: string}
        address: {type: string}
        rating: {type: number}
    ClinicDetail:
      allOf:
        - $ref: "#/components/schemas/Clinic"
        - type: object
          properties:
            services:
              type: array
              items:
                $ref: "#/components/schemas/Service"
            insurances:
              type: array
              items: {type: string}
    Service:
      type: object
      properties:
        name: {type: string}
        price_range: 
          type: object
          properties:
            min: {type: number}
            max: {type: number}
    RegisterRequest:
      type: object
      properties:
        email: {type: string}
        password: {type: string}
        role: {type: string, enum: [patient, clinic_manager]}
    ReviewSubmission:
      type: object
      properties:
        cleanliness: {type: integer}
        staff: {type: integer}
        waiting_time: {type: integer}
        comment: {type: string}

```

---

### File: `06_Security_Vault_Plan.md`

```markdown
# Security & Vault Integration Plan

## 1. Role in Architecture
HashiCorp Vault is used to decouple security logic from the Next.js application logic. It manages:
1.  **Dynamic Secrets:** Next.js does not hold the Postgres password. It requests a temporary credential from Vault on startup/refresh.
2.  **Encryption as a Service:** Sensitive fields (like exact medical inquiries) can be encrypted by Vault (Transit Engine) before being stored in Postgres.
3.  **Policy Enforcement:** Defining who can do what.

## 2. Vault Policies

### Policy: `clinic-manager`
Allows a user to edit ONLY their own clinic's data and view inquiries.

```hcl
# Allow updating specific clinic profile
path "secret/data/clinics/{{identity.entity.metadata.clinic_id}}" {
  capabilities = ["create", "update", "read"]
}

# Allow reading inquiries for their clinic
path "secret/data/inquiries/{{identity.entity.metadata.clinic_id}}/*" {
  capabilities = ["read", "list"]
}

```

### Policy: `admin`

Full access to verify clinics and moderate reviews.

```hcl
path "secret/data/*" {
  capabilities = ["create", "read", "update", "delete", "list"]
}

```

## 3. Implementation in Next.js

We will use the `node-vault` client in Next.js API routes.

**Workflow:**

1. User Login -> Next.js verifies against DB (salted hash) OR Vault Userpass.
2. Upon success, Next.js generates a Session.
3. When the user tries to `POST /api/clinics/{id}/edit`:
* Middleware checks the Session.
* Middleware queries Vault: "Does this user have permission for this path?"
* If yes, execute Prisma update.



```

```