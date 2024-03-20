import { test, expect } from '@playwright/test';
import { loadStory, getAllEvents } from './_utils.js';

test.describe('Scale component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/scale');
		const form = preview.locator('.sp-survey--question--form--scale');

		const range = form.locator('.rangeSlider');
		const slider = range.getByRole('slider');

		await expect(form).toBeVisible();
		await expect(range).toBeVisible();
		await expect(range).toHaveClass(/rangeSlider hoverable pip-labels/);

		await expect(slider).toBeVisible();

		await range.hover();
		await page.mouse.down();
		await page.mouse.move(100, 100);
		await page.mouse.up();

		const events = await getAllEvents(page);
		// const changeEvents = events.filter((i) => i.name === 'response').length;
		// expect(changeEvents).toBe(1);

		await expect(slider).toHaveAttribute('aria-valuenow', '0');
	});
});
