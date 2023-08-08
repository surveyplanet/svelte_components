import { test, expect } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Progress Bar component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'progressbar');
		const progressbar = preview.locator('.sp-progress-bar');
		const progress = preview.locator('.sp-progress-bar--progress');
		const progressValue = preview.locator('.sp-progress-bar--value');
		await expect(progressbar).toBeVisible();
		await expect(progress).not.toBeVisible(); // not visible until value is set

		let progressStyle = await progress.getAttribute('style');
		expect(progressStyle).toContain('width: 0%');

		for (let value = 5; value <= 100; value += 5) {
			await setControl(page, 'Value', 'number', value.toString());
			progressStyle = await progress.getAttribute('style');
			expect(progressStyle).toContain(`width: ${value}%`);
			await expect(progress).toBeVisible();
			await progressbar.hover();
			await expect(progressValue).toBeVisible();
			await expect(progressValue).toHaveText(`${value}`);
		}
	});
});
