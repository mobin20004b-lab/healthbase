from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Go to Search Page (English)
        print("Navigating to /en/search...")
        page.goto("http://localhost:3000/en/search")

        # Expect Filters to be visible
        print("Waiting for Filters...")
        expect(page.get_by_role("heading", name="Filters")).to_be_visible()

        # Expect Clinic Card to be visible
        print("Waiting for Clinic Cards...")
        expect(page.get_by_text("Yazd General Hospital")).to_be_visible()

        # Take screenshot
        print("Taking screenshot...")
        page.screenshot(path="/home/jules/verification/search_page.png", full_page=True)

        browser.close()

if __name__ == "__main__":
    run()
