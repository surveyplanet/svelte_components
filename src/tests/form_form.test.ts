import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Form ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/form');
		const form = preview.locator('.sp-survey--question--form--form');
		const firstName = form.getByLabel('First name');
		const lastName = form.getByLabel('Last name');
		const email = form.getByLabel('Email');
		const phone = form.getByLabel('Phone number');

		await expect(form).toBeVisible();
		await expect(firstName).toBeVisible();
		await expect(lastName).toBeVisible();
		await expect(email).toBeVisible();
		await expect(phone).toBeVisible();

		await firstName.focus();
		await page.keyboard.type('John');
		await expect(firstName).toHaveValue('John');

		await lastName.focus();
		await page.keyboard.type('Doe');
		await expect(lastName).toHaveValue('Doe');

		await email.focus();
		await page.keyboard.type('example@gmail.com');
		await expect(email).toHaveValue('example@gmail.com');

		await phone.focus();
		await page.keyboard.type('1234567890');
		await expect(phone).toHaveValue('1234567890');

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'response').length;
		expect(changeEvents).toBe(38);
	});
});
