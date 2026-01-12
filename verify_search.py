
from playwright.sync_api import sync_playwright

def verify_search(page):
    # Set a large viewport to see the desktop layout clearly
    page.set_viewport_size({"width": 1920, "height": 1080})

    # Go to the search page (using English locale)
    # Note: If localhost:3000 redirects to /fa/..., we should try to go to /en/search directly
    page.goto("http://localhost:3000/en/search")

    # Wait for the page to load
    page.wait_for_selector('h1:has-text("Find Your Care")')

    # Verify Filters
    page.wait_for_selector('text=Filters')
    page.wait_for_selector('text=Dentistry')
    page.wait_for_selector('text=Salamat')

    # Verify Clinic Cards
    page.wait_for_selector('.text-xl.font-semibold') # Clinic Name

    # Toggle a filter
    # Click on Dentistry checkbox
    # Note: Checkbox implementation uses a hidden input but label is clickable
    dentistry_label = page.get_by_text("Dentistry")
    dentistry_label.click()

    # Wait a bit for URL update (Next.js router push)
    page.wait_for_timeout(1000)

    # Take screenshot of Desktop view
    page.screenshot(path="verification_desktop.png")

    # Switch to Mobile Viewport
    page.set_viewport_size({"width": 375, "height": 812})
    page.reload()
    page.wait_for_selector('h1:has-text("Find Your Care")')

    # Verify FAB exists
    page.wait_for_selector('button:has(.lucide-map)')

    # Click FAB to toggle Map
    page.click('button:has(.lucide-map)')

    # Wait for transition
    page.wait_for_timeout(500)

    # Verify Map placeholder is visible
    page.wait_for_selector('text=Map View Placeholder')

    # Take screenshot of Mobile view (Map)
    page.screenshot(path="verification_mobile_map.png")

    print("Verification complete.")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        verify_search(page)
        browser.close()
