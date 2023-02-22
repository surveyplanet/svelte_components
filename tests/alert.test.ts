import { test, expect } from '@playwright/test';

test.describe('Alert component', () => {
	test('should exist', async ({ page }) => {
		await page.goto(
			'http://localhost:6006/story/story/src-historie-alert-alert-story-svelte'
		);
	});
});
