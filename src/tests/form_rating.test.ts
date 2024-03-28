import { test, expect } from '@playwright/test';
import { getAllEvents, loadStory } from './_utils.js';

test.describe('Rating component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/rating');
		const form = preview.locator('.sp-survey--question--form--rating');
		const input1 = form.locator('input').nth(0);
		const input2 = form.locator('input').nth(1);
		const input3 = form.locator('input').nth(2);
		const input4 = form.locator('input').nth(3);
		const input5 = form.locator('input').nth(4);
		const input6 = form.locator('input').nth(5);
		const label1 = form.locator('.sp-radio--label').nth(0);
		const label2 = form.locator('.sp-radio--label').nth(1);
		const label3 = form.locator('.sp-radio--label').nth(2);
		const label4 = form.locator('.sp-radio--label').nth(3);
		const label5 = form.locator('.sp-radio--label').nth(4);
		const label6 = form.locator('.sp-radio--label').nth(5);

		await expect(form).toHaveClass(
			/sp-survey--question--form--rating sp-survey--question--form--rating--layout-1/
		);

		await expect(form).toBeVisible();
		await expect(label1).toBeVisible();
		await expect(label2).toBeVisible();
		await expect(label3).toBeVisible();
		await expect(label4).toBeVisible();
		await expect(label5).toBeVisible();
		await expect(label6).toBeVisible();

		await expect(input1).toHaveValue('1');
		await expect(input2).toHaveValue('2');
		await expect(input3).toHaveValue('3');
		await expect(input4).toHaveValue('4');
		await expect(input5).toHaveValue('5');
		await expect(input6).toHaveValue('6');

		await expect(label1).toHaveText('Very Unsatisfied');
		await expect(label2).toHaveText('Unsatisfied');
		await expect(label3).toHaveText('Somewhat Unsatisfied');
		await expect(label4).toHaveText('Somewhat Satisfied');
		await expect(label5).toHaveText('Satisfied');
		await expect(label6).toHaveText('Very Satisfied');

		await label1.click();
		await expect(input1).toBeChecked();
		await expect(input2).not.toBeChecked();
		await expect(input3).not.toBeChecked();
		await expect(input4).not.toBeChecked();
		await expect(input5).not.toBeChecked();
		await expect(input6).not.toBeChecked();

		await label2.click();
		await expect(input2).toBeChecked();
		await expect(input1).not.toBeChecked();
		await expect(input3).not.toBeChecked();
		await expect(input4).not.toBeChecked();
		await expect(input5).not.toBeChecked();
		await expect(input6).not.toBeChecked();

		const events = await getAllEvents(page);
		expect(events).toHaveLength(2);
		expect(events[0].name).toBe('Event');
		expect(events[0].value).toEqual(
			'[ { "label": "Very Unsatisfied", "value": 1 } ]'
		);
		expect(events[0].target).toEqual('input, sp-radio--input');
	});
});
