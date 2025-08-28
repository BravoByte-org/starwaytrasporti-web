import { expect, test } from '@playwright/test';

test.describe('Homepage Integration', () => {
	test('renders correctly with all main sections', async ({ page }) => {
		await page.goto('/');

		// Check that the page loads
		await expect(page).toHaveTitle(/StarwayTrasporti/);

		// Verify all main sections are visible
		const heroSection = page.locator('[data-testid="hero-section"]');
		await expect(heroSection).toBeVisible();

		const servicesSection = page.locator('[data-testid="services-section"]');
		await expect(servicesSection).toBeVisible();

		const statsSection = page.locator('[data-testid="stats-section"]');
		await expect(statsSection).toBeVisible();

		const ctaSection = page.locator('[data-testid="cta-section"]');
		await expect(ctaSection).toBeVisible();
	});

	test('homepage flow and scroll behavior', async ({ page }) => {
		await page.goto('/');

		// Start at the top (hero section)
		const heroSection = page.locator('[data-testid="hero-section"]');
		await expect(heroSection).toBeInViewport();

		// Scroll to services section
		const servicesSection = page.locator('[data-testid="services-section"]');
		await servicesSection.scrollIntoViewIfNeeded();
		await expect(servicesSection).toBeInViewport();

		// Scroll to stats section
		const statsSection = page.locator('[data-testid="stats-section"]');
		await statsSection.scrollIntoViewIfNeeded();
		await expect(statsSection).toBeInViewport();

		// Scroll to CTA section
		const ctaSection = page.locator('[data-testid="cta-section"]');
		await ctaSection.scrollIntoViewIfNeeded();
		await expect(ctaSection).toBeInViewport();
	});

	test('complete user journey through homepage', async ({ page }) => {
		await page.goto('/');

		// 1. User sees hero section
		const heroSection = page.locator('[data-testid="hero-section"]');
		const heroTitle = heroSection.locator('h1');
		await expect(heroTitle).toBeVisible();

		// 2. User scrolls and sees services
		const servicesSection = page.locator('[data-testid="services-section"]');
		await servicesSection.scrollIntoViewIfNeeded();

		const serviceCards = servicesSection.locator('.service-card');
		await expect(serviceCards.first()).toBeVisible();

		// 3. User continues to stats section
		const statsSection = page.locator('[data-testid="stats-section"]');
		await statsSection.scrollIntoViewIfNeeded();

		const statItems = statsSection.locator('.stat-item');
		await expect(statItems.first()).toBeVisible();

		// 4. User reaches CTA section
		const ctaSection = page.locator('[data-testid="cta-section"]');
		await ctaSection.scrollIntoViewIfNeeded();

		const ctaButton = ctaSection.locator('a[href*="contact"], button').first();
		await expect(ctaButton).toBeVisible();

		// 5. User can interact with CTA
		await ctaButton.focus();
		const isFocused = await ctaButton.evaluate((el) => document.activeElement === el);
		expect(isFocused).toBe(true);
	});

	test('accessibility compliance across all sections', async ({ page }) => {
		await page.goto('/');

		// Check that all sections have proper heading hierarchy
		const headings = page.locator('h1, h2, h3, h4, h5, h6');
		const headingCount = await headings.count();
		expect(headingCount).toBeGreaterThan(0);

		// Verify main heading exists
		const mainHeading = page.locator('h1');
		await expect(mainHeading.first()).toBeVisible();

		// Check that interactive elements are keyboard accessible
		await page.keyboard.press('Tab');
		const focusedElement = page.locator(':focus');
		await expect(focusedElement).toBeVisible();

		// Test language switcher accessibility
		const languageSwitcher = page.locator('[data-testid="locale-switcher"]');
		await expect(languageSwitcher).toBeVisible();

		const ariaLabel = await languageSwitcher.getAttribute('aria-label');
		expect(ariaLabel).toBeTruthy();
	});

	test('responsive behavior on different screen sizes', async ({ page }) => {
		// Test desktop view
		await page.setViewportSize({ width: 1200, height: 800 });
		await page.goto('/');

		const heroSection = page.locator('[data-testid="hero-section"]');
		await expect(heroSection).toBeVisible();

		// Test tablet view
		await page.setViewportSize({ width: 768, height: 1024 });
		await expect(heroSection).toBeVisible();

		// Test mobile view
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(heroSection).toBeVisible();

		// Verify services section adapts to mobile
		const servicesSection = page.locator('[data-testid="services-section"]');
		await servicesSection.scrollIntoViewIfNeeded();
		await expect(servicesSection).toBeVisible();
	});

	test('performance and loading behavior', async ({ page }) => {
		// Monitor network requests
		const responses = [];
		page.on('response', (response) => responses.push(response));

		const startTime = Date.now();
		await page.goto('/');

		// Wait for hero section to be visible
		const heroSection = page.locator('[data-testid="hero-section"]');
		await expect(heroSection).toBeVisible();

		const loadTime = Date.now() - startTime;

		// Page should load in reasonable time (adjust threshold as needed)
		expect(loadTime).toBeLessThan(5000);

		// Verify critical sections load quickly
		const servicesSection = page.locator('[data-testid="services-section"]');
		await expect(servicesSection).toBeVisible();
	});
});
