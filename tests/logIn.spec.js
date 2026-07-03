import { test, expect } from '@playwright/test';

test('login flow placeholder', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/AutomationPractice/#top');
  await expect(page).toHaveTitle(/Practice/);
});
