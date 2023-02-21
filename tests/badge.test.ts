import { test, expect } from '@playwright/test';

test.describe('Badge component', () => {
	test('should exist', async ({ page }) => {
		await page.goto(
			'http://localhost:6006/?path=/story/badge-default--primary'
		);
		// Expect a title "to contain" a substring.
		await expect(page).toHaveTitle('Badge / Default - Primary ⋅ Storybook');
		// await elementHandle.contentFrame();
		const preview = await page.$('#storybook-preview-iframe');
		const iframe = await preview!.contentFrame();
		expect(iframe).toBeDefined();
		const badge = await iframe!.$('.sp-badge');
		expect(badge).toBeDefined();
	});
});
