import { expect, test } from '@playwright/test';

test.describe('Footer Component', () => {
	test('displays footer with all main sections', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');
		await expect(footer).toBeVisible();

		// Check company info section
		const companyTitle = footer.locator('h2').first();
		await expect(companyTitle).toBeVisible();
		await expect(companyTitle).toContainText('StarwayTrasporti');

		// Check company description
		const description = footer.locator('p').first();
		await expect(description).toBeVisible();
	});

	test('displays all footer link sections', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');

		// Check section titles are present
		const sectionTitles = footer.locator('h3');
		await expect(sectionTitles).toHaveCount(3); // Company, Support, Contact

		// Verify each section has links
		for (let i = 0; i < 3; i++) {
			const section = sectionTitles.nth(i);
			await expect(section).toBeVisible();
		}
	});

	test('has working navigation links', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');

		// Test company links
		const aboutLink = footer.locator('a[href="/about"]').first();
		await expect(aboutLink).toBeVisible();

		const servicesLink = footer.locator('a[href="/services"]').first();
		await expect(servicesLink).toBeVisible();

		const contactLink = footer.locator('a[href="/contact"]').first();
		await expect(contactLink).toBeVisible();
	});

	test('displays contact information', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');

		// Check for phone number
		const phoneText = footer.getByText('+39 02 1234 5678');
		await expect(phoneText).toBeVisible();

		// Check for email
		const emailText = footer.getByText('info@starwaytrasporti.it');
		await expect(emailText).toBeVisible();

		// Check for address
		const addressText = footer.getByText('Via Roma 123');
		await expect(addressText).toBeVisible();
	});

	test('includes social media links', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');

		// Check for social links (they should have aria-labels)
		const facebookLink = footer.locator('a[aria-label="Facebook"]');
		await expect(facebookLink).toBeVisible();

		const linkedinLink = footer.locator('a[aria-label="LinkedIn"]');
		await expect(linkedinLink).toBeVisible();

		const emailLink = footer.locator('a[aria-label="Email"]');
		await expect(emailLink).toBeVisible();
	});

	test('has language switcher in footer', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');
		const languageSwitcher = footer.locator('[data-testid="locale-switcher"]');

		await expect(languageSwitcher).toBeVisible();
	});

	test('displays copyright and legal links', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');

		// Check copyright notice (should include current year)
		const currentYear = new Date().getFullYear();
		const copyrightText = footer.getByText(new RegExp(`© ${currentYear} StarwayTrasporti`));
		await expect(copyrightText).toBeVisible();

		// Check legal links
		const privacyLink = footer.locator('a[href="/privacy"]');
		await expect(privacyLink).toBeVisible();

		const termsLink = footer.locator('a[href="/terms"]');
		await expect(termsLink).toBeVisible();

		const cookiesLink = footer.locator('a[href="/cookies"]');
		await expect(cookiesLink).toBeVisible();
	});

	test('footer is accessible', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');

		// Test that all links are keyboard accessible
		const links = footer.locator('a');
		const linkCount = await links.count();

		// Test a few key links for keyboard focus
		for (let i = 0; i < Math.min(linkCount, 5); i++) {
			const link = links.nth(i);
			if (await link.isVisible()) {
				await link.focus();
				const isFocused = await link.evaluate((el) => document.activeElement === el);
				expect(isFocused).toBe(true);
			}
		}
	});

	test('footer content is internationalized', async ({ page }) => {
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');

		// Check that footer sections have content (not empty)
		const sectionTitles = footer.locator('h3');
		const titleCount = await sectionTitles.count();

		for (let i = 0; i < titleCount; i++) {
			const title = sectionTitles.nth(i);
			const titleText = await title.textContent();
			expect(titleText?.trim().length).toBeGreaterThan(0);
		}

		// Check description is not empty
		const description = footer.locator('p').first();
		const descText = await description.textContent();
		expect(descText?.trim().length).toBeGreaterThan(0);
	});

	test('footer responsive behavior', async ({ page }) => {
		// Test desktop view
		await page.setViewportSize({ width: 1200, height: 800 });
		await page.goto('/');

		const footer = page.locator('[data-testid="footer"]');
		await expect(footer).toBeVisible();

		// Test mobile view
		await page.setViewportSize({ width: 375, height: 667 });
		await expect(footer).toBeVisible();

		// Footer should still be accessible on mobile
		const mobileLinks = footer.locator('a');
		await expect(mobileLinks.first()).toBeVisible();
	});
});
