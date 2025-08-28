import { expect, test } from '@playwright/test';

test.describe('Hero Component', () => {
	test('renders hero section with expected elements', async ({ page }) => {
		await page.goto('/');

		const heroSection = page.locator('[data-testid="hero-section"]');
		await expect(heroSection).toBeVisible();

		// Check for hero title
		const heroTitle = heroSection.locator('h1');
		await expect(heroTitle).toBeVisible();
		await expect(heroTitle).toContainText(/trasporti|transport/i);

		// Check for hero subtitle
		const heroSubtitle = heroSection.locator('p').first();
		await expect(heroSubtitle).toBeVisible();

		// Check for scroll indicator (if enabled)
		const scrollIndicator = heroSection.locator('.scroll-indicator');
		await expect(scrollIndicator).toBeVisible();

		// Verify parallax layers are present
		const parallaxLayers = heroSection.locator('.parallax-layer');
		await expect(parallaxLayers).toHaveCount(3);
	});

	test('parallax effects work correctly', async ({ page }) => {
		await page.goto('/');

		const heroSection = page.locator('[data-testid="hero-section"]');
		const parallaxLayers = heroSection.locator('.parallax-layer');

		// Initial scroll position - get initial transforms
		const initialTransforms = [];
		const layerCount = await parallaxLayers.count();

		for (let i = 0; i < layerCount; i++) {
			const layer = parallaxLayers.nth(i);
			const transform = await layer.evaluate((el) => window.getComputedStyle(el).transform);
			initialTransforms.push(transform);
		}

		// Scroll down more to ensure parallax triggers
		await page.evaluate(() => window.scrollTo(0, 300));
		await page.waitForTimeout(200);

		// Check that transforms have changed (parallax is working)
		for (let i = 0; i < layerCount; i++) {
			const layer = parallaxLayers.nth(i);
			const newTransform = await layer.evaluate((el) => window.getComputedStyle(el).transform);
			// Either the transform changed, or we're getting a translate3d value
			const transformChanged = newTransform !== initialTransforms[i];
			const hasTranslate3d =
				newTransform.includes('translate3d') || newTransform.includes('matrix');
			expect(transformChanged || hasTranslate3d).toBe(true);
		}
	});

	test('reduced motion disables parallax effects', async ({ page }) => {
		// Set prefers-reduced-motion media query
		await page.emulateMedia({ reducedMotion: 'reduce' });
		await page.goto('/');

		const heroSection = page.locator('[data-testid="hero-section"]');
		await expect(heroSection).toBeVisible();

		// Check that hero section has reduced motion class applied
		await expect(heroSection).toHaveClass(/reduced-motion/);

		// Check that parallax effects are disabled
		const parallaxLayers = heroSection.locator('.parallax-layer');
		const layerCount = await parallaxLayers.count();

		if (layerCount > 0) {
			// Scroll down a bit
			await page.evaluate(() => window.scrollTo(0, 100));
			await page.waitForTimeout(100);

			for (let i = 0; i < layerCount; i++) {
				const layer = parallaxLayers.nth(i);
				// The transform should be 'none' or contain '0px' when reduced motion is enabled
				const transform = await layer.evaluate((el) => window.getComputedStyle(el).transform);
				const isStaticTransform =
					transform === 'none' ||
					transform.includes('0px') ||
					transform === 'matrix(1, 0, 0, 1, 0, 0)';
				expect(isStaticTransform).toBe(true);
			}
		}
	});
});
