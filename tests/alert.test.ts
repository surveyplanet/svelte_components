import { test, expect } from '@playwright/test';

test.describe('Alert component', () => {
	test('should exist', async ({ page }) => {
		await page.goto(
			'http://localhost:6006/story/src-historie-alert-alert-story-svelte?variantId=src-historie-alert-alert-story-svelte-0'
		);

		const preview = await page.frameLocator(
			'data-test-id="preview-iframe"'
		);
		// 	.first()
		// 	.locator('.sp-alert');

		expect(await preview.getByClassName());

		// const html = await alert.content();
		// console.log('---->', html);

		// expect(alert).toBeDefined();
		// expect(alert).toHaveClass('sp-alert--info');
	});
});
