import { test, expect } from '@playwright/test';

test('Search page loads and displays clinics', async ({ page }) => {
  await page.goto('http://localhost:3000/en/search');

  // Verify title
  await expect(page.getByText('Find Your Care')).toBeVisible();

  // Verify list view is default
  await expect(page.getByText('Tehran Heart Center')).toBeVisible();
  await expect(page.getByText('Milad Hospital')).toBeVisible();

  // Verify sidebar filters exist
  await expect(page.getByText('Filters')).toBeVisible();
  await expect(page.getByLabel('Search', { exact: true })).toBeVisible();

  // Verify toggle map
  await page.getByRole('button', { name: 'Map' }).click(); // Mobile FAB or Desktop if visible
  // Wait, desktop toggle isn't a button, it's just a layout shift handled by state,
  // but there is a mobile FAB button.
  // The layout has "Map View Placeholder" visible on desktop by default in the right column?
  // No, showMap state toggles "hidden lg:block" for list and map.
  // Wait, let's check code.

  // Desktop:
  // List: showMap ? "hidden lg:block" : "block"  -> If showMap=false, List is block.
  // Map: showMap ? "block" : "hidden lg:block" -> If showMap=false, Map is "hidden lg:block" (visible on lg).
  // So on desktop, both are visible side-by-side if showMap=false?

  // Mobile FAB toggles showMap.
});
