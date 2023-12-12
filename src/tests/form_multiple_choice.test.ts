import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Multiple choice  component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/multipleChoice');
		const form = preview.locator('form');
		const input1 = form.locator('input').nth(0);
		const input2 = form.locator('input').nth(1);
		const input3 = form.locator('input').nth(2);
		const label1 = form.locator('.sp-radio--label').nth(0);
		const label2 = form.locator('.sp-radio--label').nth(1);
		const label3 = form.locator('.sp-radio--label').nth(2);

		await expect(form).toHaveClass(
			/sp-survey--question--form--multiple-choice sp-survey--question--form--multiple-choice--layout-1/
		);
		await expect(label1).toBeVisible();
		await expect(label2).toBeVisible();
		await expect(label3).toBeVisible();

		await expect(label1).toHaveText('Harry');
		await expect(label2).toHaveText('Larry');
		await expect(label3).toHaveText('Moe');

		await label1.click();
		await expect(input1).toBeChecked();
		await expect(input2).not.toBeChecked();
		await expect(input3).not.toBeChecked();

		await label2.click();
		await expect(input2).toBeChecked();
		await expect(input1).not.toBeChecked();
		await expect(input3).not.toBeChecked();

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'response').length;
		expect(changeEvents).toBe(2);
	});

	test('multi', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/multipleChoice');
		const form = preview.locator('form');
		const input1 = form.locator('input').nth(0);
		const input2 = form.locator('input').nth(1);
		const input3 = form.locator('input').nth(2);

		await setControl(page, 'Multi', 'checkbox', 'true');

		const label1 = form.locator('.sp-checkbox--label').nth(0);
		const label2 = form.locator('.sp-checkbox--label').nth(1);
		const label3 = form.locator('.sp-checkbox--label').nth(2);

		await label1.click();
		await expect(input1).toBeChecked();
		await expect(input2).not.toBeChecked();
		await expect(input3).not.toBeChecked();

		await label2.click();
		await expect(input2).toBeChecked();
		await expect(input1).toBeChecked();
		await expect(input3).not.toBeChecked();

		await label3.click();
		await expect(input3).toBeChecked();
		await expect(input1).toBeChecked();
		await expect(input2).toBeChecked();

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'response').length;
		expect(changeEvents).toBe(3);
	});
});
