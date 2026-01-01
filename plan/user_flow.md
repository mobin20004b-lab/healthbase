# User Flow & Journey Maps

This document details the key user journeys for the Yazd Health Transparency Platform.

## Journey 1: The Local Parent (Persona A)

**Goal:** Find a reliable pediatrician for their child, worried about costs and quality.

### Steps
1.  **Entry:** Opens the site (Persian).
2.  **Search:** Types "Pediatrician" (or selects category) and filters by "Insurance: Tamin Ejtemaei".
3.  **Discovery:** Views list of clinics. Sorts by "Rating".
4.  **Evaluation:** Clicks on a top-rated clinic. Reads reviews (specifically regarding "Staff Friendliness" and "Wait Time"). Checks the price range for a standard visit.
5.  **Decision:** Decides this is the right place.
6.  **Action:** Clicks "Call" to make an appointment (outside the platform) or "Save to Favorites" for later.
7.  **Post-Visit:** Returns to the platform, logs in, and leaves a review about the experience.

### Checks
- [ ] Search returns relevant pediatricians.
- [ ] Insurance filter works.
- [ ] Price range is visible.
- [ ] Call button triggers phone dialer.
- [ ] Review submission works.

### AC
-   User completes the flow without frustration.
-   Information is easy to find.

### Test Scenario
-   Simulate this exact path in the staging environment.

---

## Journey 2: The Medical Tourist (Persona B)

**Goal:** Find a high-quality cosmetic surgery clinic, needs English info and trust signals.

### Steps
1.  **Entry:** Lands on the site. Switches language to English.
2.  **Search:** Selects "Cosmetic Surgery" -> "Rhinoplasty".
3.  **Discovery:** Looks for "Verified" badges. Filters by "English Speaking" (if attribute exists) or checks descriptions.
4.  **Evaluation:** Reviews "Service Content" for Rhinoplasty to understand the process in Iran. Checks "Before/After" (if available/allowed) or reads detailed service descriptions.
5.  **Action:** Uses "Show on Map" to see proximity to their hotel. Clicks "WhatsApp" (if available) or copies email to contact.
6.  **Trust:** Sees the "Verified" badge and positive reviews from other tourists.

### Checks
-   Language switch persists.
-   English content is available for services.
-   Verified badge is prominent.

### AC
-   English translations are accurate.
-   Layout works in LTR.

### Test Scenario
-   Simulate this path. Ensure no Persian text leaks into the English interface (except maybe proper nouns).

---

## Journey 3: The Clinic Owner (Persona C)

**Goal:** Manage their online presence and respond to feedback.

### Steps
1.  **Entry:** Logs in with Clinic Admin credentials.
2.  **Dashboard:** Sees "Profile Views" and "Recent Reviews".
3.  **Update:** Notices their phone number is outdated. Navigates to "Edit Profile". Updates phone number. Saves.
4.  **Engagement:** Sees a new review. Writes a polite response thanking the patient.
5.  **Transparency:** Adds a new service "Teeth Whitening" with a price range.

### Checks
-   Dashboard loads correctly.
-   Profile update reflects public-facing immediately.
-   Response to review is saved.
-   New service appears on the profile.

### AC
-   Dashboard is easy to use (no technical knowledge needed).

### Test Scenario
-   Log in as Clinic Owner. Update data. Verify on public side.
