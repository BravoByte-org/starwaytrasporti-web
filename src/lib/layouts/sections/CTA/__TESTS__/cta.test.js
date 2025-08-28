import { expect, test } from '@playwright/test';

test.describe('CTA Component', () => {
	test('displays CTA section with call-to-action elements', async ({ page }) => {
		await page.goto('/');

		const ctaSection = page.locator('[data-testid="cta-section"]');
		await expect(ctaSection).toBeVisible();

		// Check for CTA title
		const ctaTitle = ctaSection.locator('h2');
		await expect(ctaTitle).toBeVisible();

		// Check for CTA description
		const ctaDescription = ctaSection.locator('p');
		await expect(ctaDescription).toBeVisible();

		// Check for CTA button (expect at least one button)
		const ctaButtons = ctaSection.locator('a[href*="contact"], button');
		await expect(ctaButtons.first()).toBeVisible();
	});

	test('CTA button is interactive', async ({ page }) => {
		await page.goto('/');

		const ctaSection = page.locator('[data-testid="cta-section"]');
		const ctaButton = ctaSection.locator('a[href*="contact"], button').first();

		await expect(ctaButton).toBeVisible();

		// Test that button can be focused
		await ctaButton.focus();
		const isFocused = await ctaButton.evaluate((el) => document.activeElement === el);
		expect(isFocused).toBe(true);

		// Test that button can be clicked (should not throw error)
		await ctaButton.click();
	});

	test('CTA content is properly internationalized', async ({ page }) => {
		await page.goto('/');

		const ctaSection = page.locator('[data-testid="cta-section"]');

		// Check that CTA title is not empty
		const ctaTitle = ctaSection.locator('h2');
		const titleText = await ctaTitle.textContent();
		expect(titleText.trim().length).toBeGreaterThan(0);

		// Check that CTA description is not empty
		const ctaDescription = ctaSection.locator('p');
		const descText = await ctaDescription.textContent();
		expect(descText.trim().length).toBeGreaterThan(0);

		// Check that CTA button has text
		const ctaButton = ctaSection.locator('a[href*="contact"], button').first();
		const buttonText = await ctaButton.textContent();
		expect(buttonText.trim().length).toBeGreaterThan(0);
	});

	test('CTA section has proper styling variants', async ({ page }) => {
		await page.goto('/');

		const ctaSection = page.locator('[data-testid="cta-section"]');
		await expect(ctaSection).toBeVisible();

		// Verify the section has proper background styling
		const bgColor = await ctaSection.evaluate((el) => window.getComputedStyle(el).backgroundColor);
		expect(bgColor).not.toBe('rgba(0, 0, 0, 0)'); // Should not be transparent
	});
});
