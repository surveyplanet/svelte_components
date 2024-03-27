import { test, expect } from '@playwright/test';
import {
	// getAllEvents,
	loadStory,
} from './_utils.js';

test.describe('Scoring component ', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'question_forms/scoring');
		const form = preview.locator('.sp-survey--question--form--scoring');
		const table = form.locator('table');
		const thead = table.locator('thead');
		const tbody = table.locator('tbody');
		const tr = tbody.locator('tr');
		const reset = form.locator('button');

		await expect(form).toBeVisible();

		await expect(table).toBeVisible();
		await expect(thead).toBeVisible();
		await expect(tbody).toBeVisible();
		await expect(reset).toBeVisible();

		await expect(thead.locator('th').nth(1)).toHaveText('Yucky');
		await expect(thead.locator('th').nth(2)).toHaveText('Yummy');

		await expect(tr.locator('th').nth(0)).toHaveText('Apple');
		await expect(tr.locator('th').nth(1)).toHaveText('Orange');
		await expect(tr.locator('th').nth(2)).toHaveText('Banana');
		await expect(tr.locator('th').nth(3)).toHaveText('Grapes');

		await tr.nth(0).locator('label').nth(0).click();
		await tr.nth(1).locator('label').nth(1).click();
		await tr.nth(2).locator('label').nth(2).click();
		await tr.nth(3).locator('label').nth(3).click();

		await expect(tr.nth(0).locator('input').nth(0)).toBeChecked();
		await expect(tr.nth(1).locator('input').nth(1)).toBeChecked();
		await expect(tr.nth(2).locator('input').nth(2)).toBeChecked();
		await expect(tr.nth(3).locator('input').nth(3)).toBeChecked();

		await expect(tr.nth(0).locator('input').nth(0)).toHaveValue('1');
		await expect(tr.nth(1).locator('input').nth(1)).toHaveValue('2');
		await expect(tr.nth(2).locator('input').nth(2)).toHaveValue('3');
		await expect(tr.nth(3).locator('input').nth(3)).toHaveValue('4');

		// const events = await getAllEvents(page);
		// console.log(events);
		await reset.click();

		await expect(tr.nth(0).locator('input').nth(0)).not.toBeChecked();
		await expect(tr.nth(1).locator('input').nth(1)).not.toBeChecked();
		await expect(tr.nth(2).locator('input').nth(2)).not.toBeChecked();
		await expect(tr.nth(3).locator('input').nth(3)).not.toBeChecked();
	});
});
