import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Chips component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'chips');
		const chips = preview.locator('.sp-chips');
		const chipsButtons = chips.getByRole('button');

		await expect(chips).toBeVisible();
		expect(chipsButtons).toBeTruthy();
		await chipsButtons.nth(0).click();

		await expect(chipsButtons).toHaveCount(4);
		await expect(chipsButtons.nth(0)).toHaveText('Apple');
		await expect(chipsButtons.nth(1)).toHaveText('Peach');
		await expect(chipsButtons.nth(2)).toHaveText('Banana');
		await expect(chipsButtons.nth(3)).toHaveText('Orange');

		await expect(chipsButtons.nth(0)).toHaveClass(
			/sp-chips--chip--selected/
		);
		await expect(chipsButtons.nth(1)).not.toHaveClass(
			/sp-chips--chip--selected/
		);

		const events = await getAllEvents(page);
		expect(events.length).toBe(1);
		expect(events[0].name).toBe('PointerEvent');
		expect(events[0].value).toBe(
			'[ { "id": "apple", "label": "Apple", "selected": true }, { "id": "peach", "label": "Peach", "selected": false }, { "id": "banana", "label": "Banana", "selected": false }, { "id": "orange", "label": "Orange ", "selected": false } ]'
		);
		expect(events[0].target).toBe('span, sp-chips--chip--label');
	});
	test('Multiselect', async ({ page }) => {
		const preview = await loadStory(page, 'chips');
		const chips = preview.locator('.sp-chips');
		const chipsButtons = chips.getByRole('button');
		await expect(chips).toBeVisible();
		expect(chipsButtons).toBeTruthy();

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
		expect(events.length).toBe(4);
		expect(events[0].name).toBe('PointerEvent');
		expect(events[3].value).toBe(
			'[ { "id": "apple", "label": "Apple", "selected": true }, { "id": "peach", "label": "Peach", "selected": true }, { "id": "banana", "label": "Banana", "selected": true }, { "id": "orange", "label": "Orange ", "selected": true } ]'
		);
		expect(events[3].target).toBe('span, sp-chips--chip--label');
	});
});
