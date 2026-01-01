# User Flow & Journeys

This document outlines the critical user journeys for the Yazd Health Transparency Platform.

## 1. Guest User: Search & Discovery (The "Anxious Parent")

- **Goal:** Find a safe, affordable clinic for a specific procedure.
- **Flow:**
    1.  **Landing Page:** User enters "Pediatric MRI" in Search Bar.
    2.  **Results Page:** System lists 5 clinics.
    3.  **Filtering:** User filters by "Tamin Ejtemaei Insurance" and "Verified".
    4.  **Comparison:** User sees 2 clinics. Clinic A has range "5-7M IRR", Clinic B has "Unknown".
    5.  **Selection:** User clicks Clinic A.
    6.  **Verification:** User checks "Cleanliness" rating (4.5/5).
    7.  **Action:** User clicks "Call" or "View on Map".
- **Checks:**
    - Search is accurate.
    - Price is visible without login.
- **Acceptance Criteria:**
    - Frictionless flow (no login required).
- **Test Scenario:**
    - End-to-end test of the above steps.

## 2. Guest User: Medical Tourist (English)

- **Goal:** Find a clinic with English support.
- **Flow:**
    1.  **Landing Page:** User switches language to "English".
    2.  **Search:** Searches for "Hair Transplant".
    3.  **Results:** Listings show English names and "Medical Tourism License" badge.
    4.  **Detail:** User reads English description and price in USD (if applicable/converted).
    5.  **Action:** Saves location to Google Maps.
- **Checks:**
    - All UI elements translate.
- **Acceptance Criteria:**
    - No Persian text leaks in English view.
- **Test Scenario:**
    - Verify "Hair Transplant" returns relevant results in English mode.

## 3. Registered Patient: Write Review

- **Goal:** Share feedback about an experience.
- **Flow:**
    1.  **Login:** User logs in.
    2.  **Navigation:** Goes to "My Visits" (if implemented) or searches the clinic.
    3.  **Review Button:** Clicks "Write Review".
    4.  **Form:**
        - Selects Stars (Overall, Staff, Hygiene).
        - Writes Comment.
        - (Optional) Uploads receipt for "Verified Visit" status.
    5.  **Submit:** See "Pending Approval" message.
- **Checks:**
    - User cannot review same clinic twice (optional rule).
- **Acceptance Criteria:**
    - Submission is stored in DB with "pending" status.
- **Test Scenario:**
    - Submit review -> Check DB -> Status is Pending.

## 4. Clinic Admin: Update Profile

- **Goal:** Update price list for the new year.
- **Flow:**
    1.  **Login:** Clinic Admin logs in.
    2.  **Dashboard:** Navigates to "My Services".
    3.  **Edit:** Selects "General Checkup".
    4.  **Update:** Changes price from 1.0M to 1.2M.
    5.  **Save:** Clicks Save.
    6.  **Verify:** Checks public page to see new price.
- **Checks:**
    - Update is immediate.
- **Acceptance Criteria:**
    - Only owns clinic data can be edited.
- **Test Scenario:**
    - Edit Price -> Refresh Public Page -> Price Updated.

## 5. System Admin: Moderation

- **Goal:** Approve valid reviews and block spam.
- **Flow:**
    1.  **Login:** Admin logs in.
    2.  **Dashboard:** Navigates to "Review Queue".
    3.  **Review:** Reads a review.
    4.  **Action:** Clicks "Approve".
    5.  **Result:** Review becomes visible on public site.
- **Checks:**
    - Approved review updates `is_approved` flag.
- **Acceptance Criteria:**
    - Simple UI for rapid moderation.
- **Test Scenario:**
    - Approve review -> Check public API -> Review is returned.
