# Frontend Development Plan: Topmedica

This document outlines the frontend development tasks for the Topmedica platform MVP. The frontend is built using Next.js 15 (App Router), Tailwind CSS v4, and `next-intl`.

## 1. Project Scaffolding & Design System

- **Task:** Setup Next.js App Router structure and basic UI components.
- **Steps:**
    1.  Setup folder structure (`app/[locale]/`, `components/`, `lib/`).
    2.  Configure `next-intl` for Internationalization (fa/en) and RTL support.
    3.  Setup Tailwind CSS with a custom theme:
        - Apply Material 3 color palette from `plan/mataill3.md`.
        - Configure font-family for **Vazirmatn**, **Matn**, and **IRANSansX**.
    4.  Setup Media Storage Strategy:
        - Use `public/uploads/` for all user-generated and dynamic content.
        - Structure: `/blogs`, `/clinics`, `/users`, `/contents`.
    5.  Create base UI components: `Button`, `Input`, `Card`, `Modal`, `Badge`.
    6.  Implement `Navbar` and `Footer` (responsive) with **Topmedica** branding.
- **Checks:**
    - `npm run dev` works.
    - Layout switches direction (RTL/LTR) based on locale.
- **Acceptance Criteria:**
    - Clean console (no errors).
    - Design matches "Modern, Clean" requirement.
- **Plan to Docs:**
    - Document component usage in `README.md` or Storybook (optional).
- **QC:**
    - Check accessibility (contrast, aria-labels).
- **Test Scenario:**
    - Switch language -> Layout flips mirror-image.

## 2. Landing Page & Global Search UI

- **Task:** Build the Home Page with Search capability.
- **Steps:**
    1.  Create `app/[locale]/page.tsx`.
    2.  Implement Hero section with "Search Bar" (City, Specialty, Insurance).
    3.  Implement "Featured Clinics" or "Popular Categories" section.
    4.  Connect Search Input to `/search` results page.
- **Checks:**
    - Search redirects to Results page with query params.
    - Responsive on Mobile/Desktop.
- **Acceptance Criteria:**
    - Search is the primary focus (center of screen).
- **Plan to Docs:**
    - None.
- **QC:**
    - Verify Persian font rendering.
- **Test Scenario:**
    - Enter "Dentist" in search -> Redirects to `/search?q=Dentist`.

## 3. Search Results & Filtering Page

- **Task:** Create the Clinic Listing page.
- **Steps:**
    1.  Create `app/[locale]/clinics/page.tsx` (or `/search`).
    2.  Implement Filters Sidebar/Modal (Location, Price, Rating).
    3.  Implement Clinic Card list (Name, Rating, Address, "Verified" Badge).
    4.  Implement Pagination/Infinite Scroll.
    5.  Connect to `GET /api/clinics` or `GET /api/search`.
- **Checks:**
    - Filters update the list dynamically.
    - Loading states (Skeleton) are present.
- **Acceptance Criteria:**
    - Smooth transition when filtering.
- **Plan to Docs:**
    - None.
- **QC:**
    - Check for "No Results" state.
- **Test Scenario:**
    - Filter by "5 Stars" -> Only 5-star clinics shown.

## 4. Clinic Detail Page

- **Task:** Build the comprehensive Clinic Profile page.
- **Steps:**
    1.  Create `app/[locale]/clinics/[id]/page.tsx`.
    2.  Display Header (Name, Images, Contact, Verified Badge).
    3.  Implement "Services & Pricing" tab/section.
    4.  Implement "Insurance" section.
    5.  Implement "Reviews" section with "Write a Review" button.
- **Checks:**
    - All data points from Backend are visible.
    - Map renders correct coordinates (if available).
- **Acceptance Criteria:**
    - Price ranges are clearly visible.
- **Plan to Docs:**
    - None.
- **QC:**
    - Verify SEO tags (Metadata) for the clinic.
- **Test Scenario:**
    - Load a clinic page -> Check Title and Description.

## 5. User Authentication Flows

- **Task:** specific pages for Login and Register.
- **Steps:**
    1.  Create `app/[locale]/auth/login/page.tsx`.
    2.  Create `app/[locale]/auth/register/page.tsx`.
    3.  Integrate with NextAuth (`signIn`, `signOut`).
    4.  Handle validation errors and success redirects.
- **Checks:**
    - User can log in and gets redirected to previous page/home.
- **Acceptance Criteria:**
    - Forms have client-side validation (Zod + React Hook Form).
- **Plan to Docs:**
    - None.
- **QC:**
    - Test "Forgot Password" flow stub (if applicable).
- **Test Scenario:**
    - Invalid email format -> Show error message.

## 6. Dashboards (Clinic & Admin)

- **Task:** specific dashboards for data management.
- **Steps:**
    1.  Create `app/[locale]/dashboard/clinic/page.tsx` (Edit Profile, Services).
    2.  Create `app/[locale]/admin/page.tsx` (Verification Queue).
    3.  Protect routes with Middleware/Higher-Order Components.
- **Checks:**
    - Non-admins cannot access Admin dashboard.
- **Acceptance Criteria:**
    - Functional forms for updating data.
- **Plan to Docs:**
    - None.
- **QC:**
    - Test permissions.
- **Test Scenario:**
    - Login as User -> Try to access `/admin` -> 403/Redirect.
