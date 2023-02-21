import { test, expect } from '@playwright/test';

test.describe('Badge component', () => {
	test('should exist', async ({ page }) => {
		await page.goto(
			'http://localhost:6006/story/src-historie-badge-story-svelte?variantId=_default'
		);
		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle('badge › default | Histoire');
		// await elementHandle.contentFrame();
		const preview = await page.$('#historie-preview-iframe');
		const iframe = await preview!.contentFrame();
		expect(iframe).toBeDefined();
		const badge = await iframe!.$('.sp-badge');
		expect(badge).toBeDefined();
	});
});
