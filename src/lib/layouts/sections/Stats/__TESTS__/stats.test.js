import { expect, test } from '@playwright/test';

test.describe('Stats Component', () => {
	test('displays stats section with statistics', async ({ page }) => {
		await page.goto('/');

		const statsSection = page.locator('[data-testid="stats-section"]');
		await expect(statsSection).toBeVisible();

		// Check for stats title
		const statsTitle = statsSection.locator('h2');
		await expect(statsTitle).toBeVisible();

		// Check for stat items
		const statItems = statsSection.locator('.stat-item');
		const statCount = await statItems.count();
		expect(statCount).toBeGreaterThanOrEqual(3);

		// Verify each stat item has number and label
		for (let i = 0; i < statCount; i++) {
			const statItem = statItems.nth(i);
			await expect(statItem.locator('div').first()).toBeVisible(); // stat number
			await expect(statItem.locator('p')).toBeVisible(); // stat label
		}
	});

	test('stat numbers are properly formatted', async ({ page }) => {
		await page.goto('/');

		const statsSection = page.locator('[data-testid="stats-section"]');
		const statNumbers = statsSection.locator('.stat-item div').first();

		// Check that stat numbers contain numeric content
		const count = await statNumbers.count();
		for (let i = 0; i < count; i++) {
			const statNumber = statNumbers.nth(i);
			const numberText = await statNumber.textContent();

			// Should contain numbers or + symbols (e.g., "500+", "15", "99%")
			expect(numberText).toMatch(/[\d+%]/);
		}
	});

	test('stats animation works on scroll', async ({ page }) => {
		await page.goto('/');

		const statsSection = page.locator('[data-testid="stats-section"]');

		// Scroll to stats section to trigger animations
		await statsSection.scrollIntoViewIfNeeded();
		await page.waitForTimeout(500);

		// Verify all stat items are visible after scroll
		const statItems = statsSection.locator('.stat-item');
		const count = await statItems.count();

		for (let i = 0; i < count; i++) {
			const statItem = statItems.nth(i);
			await expect(statItem).toBeVisible();
		}
	});

	test('stats content is internationalized', async ({ page }) => {
		await page.goto('/');

		const statsSection = page.locator('[data-testid="stats-section"]');

		// Check that stats title is not empty
		const statsTitle = statsSection.locator('h2');
		const titleText = await statsTitle.textContent();
		expect(titleText.trim().length).toBeGreaterThan(0);

		// Check that stat labels are not empty
		const statLabels = statsSection.locator('.stat-item p');
		const count = await statLabels.count();

		for (let i = 0; i < count; i++) {
			const label = statLabels.nth(i);
			const labelText = await label.textContent();
			expect(labelText.trim().length).toBeGreaterThan(0);
		}
	});
});
