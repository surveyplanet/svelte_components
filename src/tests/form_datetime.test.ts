import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Date Time component ', () => {
	test('date and time', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/datetime');
		const dateTime = preview.locator(
			'.sp-survey--question--form--datetime'
		);
		const textInput = dateTime.locator('.sp-text-input');
		const input = textInput.locator('input');

		await expect(dateTime).toBeVisible();
		await expect(textInput).toBeVisible;
		await expect(input).toBeVisible();

		await expect(input).toHaveAttribute('type', 'datetime-local');
		await input.focus();
		await page.keyboard.type('08302021');
		await page.keyboard.press('ArrowRight');
		await page.keyboard.type('0000A');
		// console.log(await input.inputValue());
		await expect(input).toHaveValue('2021-03-08T00:00');

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'response');
		expect(changeEvents).toHaveLength(7);

		await setControl(page, 'Id', 'text', 'my-id');
		await expect(input).toHaveAttribute('id', 'my-id-datetime-input');
	});

	test('date only', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/datetime');
		const dateTime = preview.locator(
			'.sp-survey--question--form--datetime'
		);
		const textInput = dateTime.locator('.sp-text-input');
		setControl(page, 'Date', 'checkbox', 'true');
		setControl(page, 'Time', 'checkbox', 'false');
		const input = textInput.locator('input');

		await expect(dateTime).toBeVisible();
		await expect(textInput).toBeVisible;
		await expect(input).toBeVisible();

		await expect(input).toHaveAttribute('type', 'date');
		await input.focus();
		await page.keyboard.type('08302021');
		await expect(input).toHaveValue('2021-03-08');

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'response').length;
		expect(changeEvents).toBe(4);
	});

	test('time only', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/datetime');
		const dateTime = preview.locator(
			'.sp-survey--question--form--datetime'
		);
		const textInput = dateTime.locator('.sp-text-input');
		setControl(page, 'Date', 'checkbox', 'false');
		setControl(page, 'Time', 'checkbox', 'true');
		const input = textInput.locator('input');

		await expect(dateTime).toBeVisible();
		await expect(textInput).toBeVisible;
		await expect(input).toBeVisible();

		await expect(input).toHaveAttribute('type', 'time');
		await input.focus();
		await page.keyboard.type('0821A');
		await expect(input).toHaveValue('08:21');
	});
});
