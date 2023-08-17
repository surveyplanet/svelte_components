import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Range component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/range');
		const form = preview.locator('.sp-survey--question--range--form');
		const range = form.locator('.rangeSlider');
		const sliderLeft = range.getByRole('slider').nth(0);
		const sliderRight = range.getByRole('slider').nth(1);

		await expect(form).toBeVisible();
		await expect(range).toBeVisible();
		await expect(range).toHaveClass(
			/rangeSlider range hoverable pip-labels/
		);

		await expect(sliderLeft).toBeVisible();
		await expect(sliderRight).toBeVisible();

		await sliderRight.hover();
		await page.mouse.down();
		// await page.mouse.move(300, 0);
		await page.mouse.up();

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'response').length;
		expect(changeEvents).toBe(1);

		await expect(sliderRight).toHaveAttribute('aria-valuenow', '10');
	});
});
