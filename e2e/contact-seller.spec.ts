import { test, expect } from '@playwright/test';

test('buyer can open contact dialog and send message to admin', async ({ page }) => {
  // Navigate to the marketplace
  await page.goto('/marketplace');

  // Wait for listings to load and click the first Contact Seller button
  const contactButton = page.locator('button[data-testid^="button-contact-seller-"]').first();
  await expect(contactButton).toBeVisible({ timeout: 10000 });
  await contactButton.click();

  // Dialog should open with title
  await expect(page.locator('text=Send Message')).toBeVisible({ timeout: 5000 });

  // Fill message
  await page.fill('textarea#message', 'Automated E2E test message about this listing');

  // Intercept the POST /api/messages and wait for response
  const [response] = await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api/messages') && resp.request().method() === 'POST'),
    page.click('button:has-text("Send Message")'),
  ]);

  expect(response.status()).toBeLessThan(400);

  // Optionally check that dialog closed
  await expect(page.locator('text=Send Message')).toHaveCount(0);
});
