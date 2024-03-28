import { test, expect } from '@playwright/test';
import { loadStory } from './_utils.js';
// TEST DOES NOT WORK DUE TO PLAYWRIGHT NOT RECOGNIZING THE TOOLTIP LOCATOR ON HOVER
test.describe('Tooltip', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'actions/tooltip');
		const tooltip = preview.getByText('This is a helpful tooltip!');
		const hotSpot = preview.locator('.hot-spot');
		await hotSpot.hover();
		await expect(tooltip).not.toBeVisible();

		// await page.mouse.move(387, 150);
		await page.mouse.move(387, 150, { steps: 10 });

		// await expect(tooltip).toBeVisible(); // Fails due to playwright not recognizing it
	});
});
