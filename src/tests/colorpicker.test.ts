import { test, expect } from '@playwright/test';
import { loadStory, getAllEvents } from './_utils.js';

test.describe('ColorPicker component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'colorpicker');

		const colorPicker = preview.locator('.sp-color-picker');
		const input = colorPicker.locator('.color-picker--input');

		await expect(colorPicker).toBeVisible();
		await expect(input).toHaveValue('#fdced5');

		await colorPicker.fill('#ff0000');

		await expect(input).toHaveValue('#ff0000');

		const events = await getAllEvents(page);
		expect(events.length).toBe(1);
		expect(events[0].name).toBe('Event');
		expect(events[0].target).toBe('input, color-picker--input');
		expect(events[0].value).toBe('#ff0000');
	});
});
