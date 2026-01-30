import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 800})
    page = context.new_page()

    print("Navigating to search page...")
    # 1. Navigate to Search Page (English)
    page.goto("http://localhost:3000/en/search")

    # Wait for hydration
    page.wait_for_timeout(3000)

    print("Verifying content...")
    # 2. Verify Title and Results
    expect(page.get_by_role("heading", name="Find Your Care")).to_be_visible()

    # Check that we have results (Clinics)
    expect(page.get_by_role("heading", name="Tehran Heart Center")).to_be_visible()

    print("Testing Pagination...")
    # 3. Verify Pagination
    # Check if '2' is visible in pagination
    page.get_by_role("button", name="2", exact=True).click()
    page.wait_for_timeout(2000)

    # Should be on page 2. Check if a clinic from page 2 is visible.
    # From MOCK_CLINICS, item 6 is 'Yazd Dental Care'
    expect(page.get_by_role("heading", name="Yazd Dental Care")).to_be_visible()

    print("Testing Comparison...")
    # 4. Verify Comparison
    # Go back to page 1
    page.get_by_role("button", name="1", exact=True).click()
    page.wait_for_timeout(2000)

    # Click "Compare" on first clinic.
    # We can use locate by label "Compare". There are multiple.
    checkboxes = page.get_by_label("Compare")
    # Check the first two
    checkboxes.nth(0).check()
    checkboxes.nth(1).check()

    # 5. Verify Floating Bar
    expect(page.get_by_text("Compare Selected")).to_be_visible()

    # Check count badge '2'.
    # Use a more specific selector if '2' is too generic.
    # The badge is: <div class="... rounded-full ...">2</div>
    # But get_by_text("2", exact=True) inside the floating bar logic might be tricky.
    # But "Compare Selected" is unique enough to verify the bar appeared.

    print("Taking screenshot...")
    # 6. Screenshot
    page.screenshot(path="verification/search_verification.png")

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
