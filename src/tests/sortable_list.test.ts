import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents } from './_utils.js';

test.describe('Sortable libs', () => {
	test.only('Sortable', async ({ page }) => {
		const preview = await loadStory(page, 'sortablelist');

		const sortable = preview.locator('.sp--sortable-list');
		const items = sortable.locator('.sp-sortable-list--list-item');
		const item1 = items.nth(0);
		const item2 = items.nth(1);
		const item3 = items.nth(2);

		await expect(item1).toBeVisible();
		await expect(item2).toBeVisible();
		await expect(item3).toBeVisible();

		await expect(item1.locator('img')).toBeVisible();
		await expect(item2.locator('img')).toHaveClass(
			/sp-sortable-list--list-item-image/
		);
		await expect(item3.locator('span')).toBeVisible();
		await expect(item3.locator('span')).toHaveClass(
			/sp-sortable-list--list-item-meta/
		);
		await expect(items.nth(0)).toHaveText('Orange Subtitle   ');
		await expect(items.nth(1)).toHaveText('Apple Surprise   ');
		await expect(items.nth(2)).toHaveText('Banana Subtitle   ');

		await item1.dragTo(item3);

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'sort').length;
		expect(changeEvents).toBe(1);

		await expect(
			sortable.locator('.sp-sortable-list--list-item').nth(0)
		).toHaveText('Orange Subtitle   ');
		await expect(
			sortable.locator('.sp-sortable-list--list-item').nth(1)
		).toHaveText('Banana Subtitle   ');
		await expect(
			sortable.locator('.sp-sortable-list--list-item').nth(2)
		).toHaveText('Apple Surprise   ');
	});
});
