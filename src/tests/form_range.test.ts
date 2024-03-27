import { test, expect } from '@playwright/test';
import { loadStory, getAllEvents } from './_utils.js';

test.describe('Range component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/range');
		const form = preview.locator('.sp-survey--question--form--range');
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
		console.log(events);
		// expect(events).toHaveLength(1);
		// expect(events[0].name).toBe('Event');
		// expect(events[0].value).toEqual('[ { "value": 10 } ]');
		// expect(events[0].target).toEqual('input,');

		await expect(sliderRight).toHaveAttribute('aria-valuenow', '10');
	});
});
