import { test, expect } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Badge component', () => {
	test('should render basic badge component', async ({ page }) => {
		const preview = await loadStory(page, 'badge');

		const value = "Your're a Pro!!";
		await setControl(page, 'Content', 'text', value);
		const badge = preview.getByText(value);
		expect(badge).toBeVisible();

		const bgColor = await badge.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('background-color');
		});
		const labelColor = await badge.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('color');
		});
		const textTransform = await badge.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('text-transform');
		});
		const textOverflow = await badge.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('text-overflow');
		});
		const overflow = await badge.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('overflow');
		});

		await expect(badge).toHaveClass(/sp-badge/);
		expect(bgColor).toBe('rgb(255, 233, 120)');
		expect(labelColor).toBe('rgb(22, 33, 55)');
		expect(textTransform).toBe('uppercase');
		expect(textOverflow).toBe('ellipsis');
		expect(overflow).toBe('hidden');
	});

	// THIS TEST WILL ONLY WORK WITH SCREENSHOT
	// test('should overflow text label', async ({ page }) => {
	// 	const preview = await loadStory(page, 'badge');
	// 	const value =
	// 		'Worse almost in fellow never cared the pride bidding. Are him harold since forgot heart, to drowsy below control in.';
	// 	await setControl(page, 'Content', 'text', value);
	// 	const badge = preview.getByText(/^Worse(.+)\.{3}$/);
	// 	expect(badge).toBeVisible();
	// });
});
