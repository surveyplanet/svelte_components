import { test, expect } from '@playwright/test';
import { loadStory } from './_utils.js';

test.describe('Footer component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'footer');
		const footer = preview.locator('.sp-footer');

		await expect(footer).toBeVisible();
		await expect(footer.locator('.sp-footer--item')).toHaveCount(4);
		await expect(footer.locator('.sp-footer--item').nth(0)).toHaveText(
			'About'
		);
		await expect(footer.locator('a')).toHaveCount(3);
		await expect(footer.locator('a').nth(0)).toHaveText('About');
		await expect(footer.locator('a').nth(1)).toHaveAttribute(
			'href',
			'/terms'
		);
		await expect(footer.locator('span')).toHaveCount(1);
	});
});
