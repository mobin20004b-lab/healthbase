import { test, expect } from '@playwright/test'; test('basic', async ({ page }) => { await page.goto('http://localhost:3000'); await expect(page).toHaveTitle(/Topmedica/); });
