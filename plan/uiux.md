# UI/UX Implementation Plan

This document outlines the UI/UX implementation tasks for the Yazd Health Transparency Platform MVP.

## Task 1: Design System & Foundation

### Steps
1.  Set up Tailwind CSS configuration.
2.  Define color palette (Medical/Trustworthy theme - Blues, Greens, Whites).
3.  Choose typography (Vazirmatn for Persian, Inter/Roboto for English).
4.  Create basic reusable components: `Button`, `Input`, `Card`, `Badge`, `Modal`.
5.  Implement RTL/LTR support using Tailwind's `rtl:` modifiers and `dir` attribute.

### Checks
- [ ] Tailwind configured.
- [ ] Fonts load correctly.
- [ ] Components render correctly in both LTR and RTL.
- [ ] Color palette is consistent.

### Acceptance Criteria (AC)
-   UI matches the "Modern, Clean, Trustworthy" aesthetic.
-   Switching language switches layout direction (mirroring).

### Plan to Docs
-   Create a Style Guide document.

### QC
-   Check contrast ratios for accessibility (WCAG).
-   Verify responsive behavior on mobile/desktop.

### Test Scenario
-   **Scenario 1:** Switch language to Persian. Verify text is right-aligned and margins flip.
-   **Scenario 2:** Check button hover states and focus rings.

---

## Task 2: Core Pages (Public)

### Steps
1.  Design and implement **Landing Page**: Search bar, quick categories, value prop.
2.  Design and implement **Search Results Page**: Filter sidebar (desktop) / bottom sheet (mobile), clinic cards.
3.  Design and implement **Clinic Detail Page**: Info header, tabs for Services/Reviews/Info, sticky contact button (mobile).
4.  Design and implement **Service Detail Page**: Educational content, price range, FAQ.

### Checks
- [ ] Landing page is responsive.
- [ ] Search page handles empty states.
- [ ] Clinic detail page displays all info clearly.
- [ ] Mobile navigation works.

### Acceptance Criteria (AC)
-   Search filters are easy to use on mobile.
-   Clinic cards show key info (Rating, Location, Tags).
-   Pages load fast (Next.js SSR/ISR).

### Plan to Docs
-   Update sitemap.

### QC
-   Check for layout shifts (CLS).
-   Verify images have alt text.

### Test Scenario
-   **Scenario 1:** On mobile, search for a clinic, open filters, apply a filter. Verify UI updates.
-   **Scenario 2:** Navigate to a clinic page. Verify the "Call" button is easily accessible on mobile.

---

## Task 3: Interactive Features (Reviews & Auth)

### Steps
1.  Design and implement **Login/Register Modal/Page**.
2.  Design and implement **Write Review Modal**: Star rating inputs, slider for sub-scores, text area.
3.  Design and implement **Favorites List**.

### Checks
- [ ] Login form validates input.
- [ ] Review form captures all metrics.
- [ ] Feedback is given on success/failure (Toasts).

### Acceptance Criteria (AC)
-   Review form is intuitive (sliders/stars are clear).
-   Login flow redirects back to previous page.

### Plan to Docs
-   N/A

### QC
-   Verify form error states are visible.
-   Check tab order for keyboard navigation.

### Test Scenario
-   **Scenario 1:** Try to write a review without logging in. Verify redirection to login.
-   **Scenario 2:** Submit a review with missing rating. Verify validation error.

---

## Task 4: Dashboards (Clinic & Admin)

### Steps
1.  Design and implement **Clinic Dashboard**: Sidebar nav, Profile edit form, Analytics charts/cards.
2.  Design and implement **Admin Dashboard**: Clinic verification list, Review moderation queue.

### Checks
- [ ] Dashboard layout is functional.
- [ ] Forms handle data loading and saving states.
- [ ] Admin lists have actions (Approve/Reject).

### Acceptance Criteria (AC)
-   Clinic owner can easily update their hours and services.
-   Admin can quickly process pending items.

### Plan to Docs
-   N/A

### QC
-   Verify permissions (Admin pages not visible to others).

### Test Scenario
-   **Scenario 1:** Log in as Clinic Owner. Go to dashboard. Update phone number. Save. Verify success message.
-   **Scenario 2:** Log in as Admin. Go to pending reviews. Approve one. Verify it disappears from list.
