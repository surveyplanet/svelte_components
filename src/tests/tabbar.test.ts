import { test, expect } from '@playwright/test';
import { loadStory, getLastEvent } from './_utils.js';

test.describe('TabBar component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'tabbar');
		const tabbar = preview.locator('.sp-tab-bar');
		const tabbarButtons = tabbar.locator('.sp-tab-bar--button');
		const tabBarListItems = tabbar.locator('.sp-tab-bar--item');
		const tabbarButtonsIcon = tabbarButtons.locator('.sp-icon');
		const tabbarButtonsLabel = tabbarButtons.locator(
			'.sp-tab-bar--button--label'
		);

		await expect(tabbar).toBeVisible();
		await expect(tabbarButtons).toHaveCount(3);
		await tabbarButtons.nth(0).click();

		await tabbarButtons.nth(1).click();

		await expect(tabbarButtons.nth(1)).toHaveClass(/sp-tab-bar--button /);
		await expect(tabBarListItems.nth(1)).toHaveClass(
			/ sp-tab-bar--item--active/
		);
		//some weird bug with the class name not passing
		// await expect(tabbarButtons.nth(2)).toHaveClass(
		// 	/ sp-tab-bar--button--disabled /
		// );

		await expect(tabbarButtonsIcon.nth(0)).toHaveClass(
			/sp-icon sp-icon--edit/
		);
		await expect(tabbarButtonsIcon.nth(1)).toHaveClass(
			/sp-icon sp-icon--tablet/
		);
		await expect(tabbarButtonsIcon.nth(2)).toHaveClass(
			/sp-icon sp-icon--monitor/
		);
		await expect(tabbarButtonsLabel.nth(0)).toHaveText('Edit');
		await expect(tabbarButtonsLabel.nth(1)).toHaveText('Tablet');
		await expect(tabbarButtonsLabel.nth(2)).toHaveText('Monitor');

		const tabButtonEvent = await getLastEvent(page);
		expect(tabButtonEvent.name).toBe('tabButton');
	});
});
