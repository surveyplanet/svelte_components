import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Chips component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'chips');
		const chips = preview.locator('.sp-chips');
		const chipsButtons = chips.locator('button');

		await expect(chips).toBeVisible();
		expect(chipsButtons).toBeTruthy();
		await expect(chipsButtons).toHaveCount(4);
		await expect(chipsButtons.nth(0)).toHaveText('Apple');
		await expect(chipsButtons.nth(1)).toHaveText('Peach');
		await expect(chipsButtons.nth(2)).toHaveText('Banana');
		await expect(chipsButtons.nth(3)).toHaveText('Orange');

		await chipsButtons.nth(0).click();
		await expect(chipsButtons.nth(0)).toHaveClass(
			/sp-chips--chip--selected/
		);
		await expect(chipsButtons.nth(1)).not.toHaveClass(
			/sp-chips--chip--selected/
		);

		const events = await getAllEvents(page);
		const clickEvents = events.filter((i) => i.name === 'click').length;
		expect(clickEvents).toBe(1);
	});
	test('Multiselect', async ({ page }) => {
		const preview = await loadStory(page, 'chips');
		const chips = preview.locator('.sp-chips');
		const chipsButtons = chips.locator('button');
		await setControl(page, 'Multi select', 'checkbox', 'true');

		expect(chips).toBeTruthy();

		await chipsButtons.nth(0).click();
		await expect(chipsButtons.nth(0)).toHaveClass(
			/sp-chips--chip--selected/
		);
		await chipsButtons.nth(1).click();
		await expect(chipsButtons.nth(1)).toHaveClass(
			/sp-chips--chip--selected/
		);
		await chipsButtons.nth(2).click();
		await expect(chipsButtons.nth(2)).toHaveClass(
			/sp-chips--chip--selected/
		);
		await chipsButtons.nth(3).click();
		await expect(chipsButtons.nth(3)).toHaveClass(
			/sp-chips--chip--selected/
		);

		const events = await getAllEvents(page);
		const clickEvents = events.filter((i) => i.name === 'click').length;
		expect(clickEvents).toBe(4);
	});
});
