import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Date Time component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/datetime');
		const dateTime = preview.locator('.sp-survey--question--datetime');
		const textInput = dateTime.locator('.sp-text-input');
		const input = textInput.locator('input');

		await expect(dateTime).toBeVisible();
		await expect(textInput).toBeVisible;
		await expect(input).toBeVisible();

		await expect(input).toHaveAttribute('type', 'datetime-local');
		await input.focus();
		await page.keyboard.type('20022021');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.type('0000');
		await expect(input).toHaveValue('2021-02-20T00:00');

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'response').length;
		expect(changeEvents).toBe(8);

		await setControl(page, 'Id', 'text', 'my-id');
		await expect(input).toHaveAttribute('id', 'my-id-date');
	});

	test('date', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/datetime');
		const dateTime = preview.locator('.sp-survey--question--datetime');
		const textInput = dateTime.locator('.sp-text-input');
		setControl(page, 'Date', 'checkbox', 'true');
		setControl(page, 'Time', 'checkbox', 'false');
		const input = textInput.locator('input');

		await expect(dateTime).toBeVisible();
		await expect(textInput).toBeVisible;
		await expect(input).toBeVisible();

		await expect(input).toHaveAttribute('type', 'date');
		await input.focus();
		await page.keyboard.type('20022021');
		await expect(input).toHaveValue('2021-02-20');

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'response').length;
		expect(changeEvents).toBe(4);
	});

	test('time', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/datetime');
		const dateTime = preview.locator('.sp-survey--question--datetime');
		const textInput = dateTime.locator('.sp-text-input');
		setControl(page, 'Date', 'checkbox', 'false');
		setControl(page, 'Time', 'checkbox', 'true');
		const input = textInput.locator('input');

		await expect(dateTime).toBeVisible();
		await expect(textInput).toBeVisible;
		await expect(input).toBeVisible();

		await expect(input).toHaveAttribute('type', 'time');
		await input.focus();
		await page.keyboard.type('1221');
		await expect(input).toHaveValue('12:21');
	});
});
