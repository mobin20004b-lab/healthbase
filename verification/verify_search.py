import os
from playwright.sync_api import sync_playwright

def verify_search_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Use a large viewport to see the desktop layout
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        page.goto("http://localhost:3000/en/search")

        # Wait for the page to load
        page.wait_for_selector("h1")

        # Take a screenshot
        page.screenshot(path="verification/search_page_desktop.png")
        print("Desktop screenshot taken.")

        # Test mobile view
        context_mobile = browser.new_context(viewport={"width": 375, "height": 667})
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:3000/en/search")
        page_mobile.wait_for_selector("h1")

        # Take a screenshot of mobile list view
        page_mobile.screenshot(path="verification/search_page_mobile_list.png")
        print("Mobile list screenshot taken.")

        # Click the FAB to toggle map
        # Try a less specific selector if the class chain is brittle
        # The FAB is in a div with fixed bottom-6 right-6
        # So we look for a button inside that div.
        # locator('div.fixed.bottom-6.right-6 > button')
        fab = page_mobile.locator("div.fixed.bottom-6.right-6 > button")
        fab.wait_for(state="visible")
        fab.click()

        # Wait a bit for transition
        page_mobile.wait_for_timeout(1000)

        # Take a screenshot of mobile map view
        page_mobile.screenshot(path="verification/search_page_mobile_map.png")
        print("Mobile map screenshot taken.")

        browser.close()

if __name__ == "__main__":
    verify_search_page()
