import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent } from './_utils.js';

test.describe('Essay component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/essay');
		const form = preview.locator('.sp-survey--question--form--essay');
		const input = form.locator('.sp-text-input');
		const textarea = input.locator('textarea');

		await expect(form).toBeVisible();
		await expect(input).toBeVisible();
		await expect(textarea).toBeVisible();

		await textarea.focus();
		await page.keyboard.type('This is a test');
		await expect(textarea).toHaveValue('This is a test');
		const event = await getLastEvent(page);
		expect(event).not.toBeNull();
		expect(event.name).toBe('KeyboardEvent');
		expect(event.value).toEqual('[ "This is a test" ]');
		expect(event.target).toEqual('textarea, sp-text-input--textarea');
	});
	test('min and max length', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/essay');
		const form = preview.locator('.sp-survey--question--form--essay');
		const input = form.locator('.sp-text-input');

		await setControl(page, 'Min', 'number', '5');
		await setControl(page, 'Max', 'number', '10');

		const textarea = input.locator('textarea');
		await textarea.focus();
		await page.keyboard.type('This');
		await expect(textarea).toHaveValue('This');
		// we do not have any errors yet
	});
});
