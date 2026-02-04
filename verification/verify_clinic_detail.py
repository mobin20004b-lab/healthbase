from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the clinic detail page
        page.goto("http://localhost:3000/en/clinics/mock-1")

        # Check if the title matches
        expect(page.get_by_role("heading", name="Tehran Heart Center (Mock)")).to_be_visible()

        # Check if address is visible
        expect(page.get_by_text("North Kargar Street, Tehran")).to_be_visible()

        # Check if Verified badge is visible (Exact match to avoid collision with nav links)
        expect(page.get_by_text("Verified Clinic", exact=True)).to_be_visible()

        # Check Tabs
        # Default is Services
        expect(page.get_by_role("tab", name="Services")).to_have_attribute("data-state", "active")

        # Click Reviews tab
        page.get_by_role("tab", name="Reviews").click()
        expect(page.get_by_role("tab", name="Reviews")).to_have_attribute("data-state", "active")

        # Take screenshot
        page.screenshot(path="verification/clinic_detail.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()
