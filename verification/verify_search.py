from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={'width': 1280, 'height': 800})
    page = context.new_page()

    # Navigate to search page
    page.goto("http://localhost:3000/en/search")

    # Wait for page readiness
    page.wait_for_load_state("networkidle")

    # Wait for filters to load
    page.wait_for_selector("text=Filters", timeout=15000)

    # Interact with Specialty Checkboxes
    page.click("label[for='spec-Dentistry']", force=True)
    page.click("label[for='spec-Cardiology']", force=True)

    # Click Apply Filters (Text is "Apply")
    apply_button = page.get_by_role("button", name="Apply")
    expect(apply_button).to_be_visible()
    apply_button.click(force=True)

    # Wait for URL to update
    page.wait_for_timeout(3000)

    current_url = page.url
    print(f"Current URL: {current_url}")

    # Expect URL to contain encoded or unencoded commas
    if "specialty=" in current_url:
        print("SUCCESS: Specialty param found")
    else:
        print("ERROR: Specialty param MISSING")
        exit(1)

    # Screenshot
    page.screenshot(path="verification/search_filters.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
