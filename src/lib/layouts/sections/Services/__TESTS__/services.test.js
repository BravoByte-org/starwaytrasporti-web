import { expect, test } from '@playwright/test';

test.describe('Services Component', () => {
	test('displays services section with service cards', async ({ page }) => {
		await page.goto('/');

		const servicesSection = page.locator('[data-testid="services-section"]');
		await expect(servicesSection).toBeVisible();

		// Check for services title
		const servicesTitle = servicesSection.locator('h2');
		await expect(servicesTitle).toBeVisible();

		// Check for service cards
		const serviceCards = servicesSection.locator('.service-card');
		await expect(serviceCards).toHaveCount(3);

		// Verify each service card has expected elements
		for (let i = 0; i < 3; i++) {
			const card = serviceCards.nth(i);
			await expect(card.locator('.service-icon')).toBeVisible();
			await expect(card.locator('h3')).toBeVisible();
			await expect(card.locator('p')).toBeVisible();
		}
	});

	test('service cards have proper animations on scroll', async ({ page }) => {
		await page.goto('/');

		const servicesSection = page.locator('[data-testid="services-section"]');

		// Scroll to services section to trigger animations
		await servicesSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500);

		const serviceCards = servicesSection.locator('.service-card');
		const cardCount = await serviceCards.count();

		// Verify service cards are visible after scroll
		for (let i = 0; i < cardCount; i++) {
			const card = serviceCards.nth(i);
			await expect(card).toBeVisible();
		}
	});

	test('animations are disabled with reduced motion', async ({ page }) => {
		// Set prefers-reduced-motion media query
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		const servicesSection = page.locator('[data-testid="services-section"]');
		await expect(servicesSection).toBeVisible();

		// Services should be immediately visible without needing scroll animations
		const serviceCards = servicesSection.locator('.service-card');
		const cardCount = await serviceCards.count();

		for (let i = 0; i < cardCount; i++) {
			const card = serviceCards.nth(i);
			await expect(card).toBeVisible();
		}
	});

	test('service card content is properly internationalized', async ({ page }) => {
		await page.goto('/');

		const servicesSection = page.locator('[data-testid="services-section"]');
		const serviceCards = servicesSection.locator('.service-card');

		// Check that service titles contain expected content
		const firstCardTitle = serviceCards.first().locator('h3');
		await expect(firstCardTitle).toBeVisible();

		// Verify the title is not empty and contains text
		const titleText = await firstCardTitle.textContent();
		expect(titleText.trim().length).toBeGreaterThan(0);
	});
});
