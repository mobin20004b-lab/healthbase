from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()

    # Navigate to search page
    page.goto("http://localhost:3000/en/search")

    # Wait for page readiness
    page.wait_for_load_state("networkidle")

    # Verify Translations
    # Title should be "Find Your Care" (from en.json)
    # Filter button should be "Apply" (from en.json)
    expect(page.get_by_text("Find Your Care")).to_be_visible()

    # Initial state: Should show all clinics (3)
    # We can count ClinicCards. They have "group relative flex ..." class or we can find by name.
    # Tehran Heart Center, Milad Hospital, Shiraz Central Clinic
    expect(page.get_by_text("Tehran Heart Center")).to_be_visible()
    expect(page.get_by_text("Shiraz Central Clinic")).to_be_visible()

    # Interact with Specialty Checkboxes: Filter for "Dentistry"
    # Shiraz Central Clinic (id 3) has Dentistry.
    # Tehran Heart Center (id 1) has Cardiology.

    page.click("label[for='spec-Dentistry']", force=True)

    # Click Apply
    apply_button = page.get_by_role("button", name="Apply")
    apply_button.click(force=True)

    # Wait for URL to update
    page.wait_for_timeout(2000)

    # Verify URL
    current_url = page.url
    print(f"Current URL: {current_url}")
    if "specialty=Dentistry" not in current_url:
        print("ERROR: URL not updated")
        exit(1)

    # Verify Results
    # Should see Shiraz Central Clinic
    # Should NOT see Tehran Heart Center
    expect(page.get_by_text("Shiraz Central Clinic")).to_be_visible()
    expect(page.get_by_text("Tehran Heart Center")).not_to_be_visible()

    print("SUCCESS: Filtering works!")

    # Screenshot
    page.screenshot(path="verification/search_complete.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
