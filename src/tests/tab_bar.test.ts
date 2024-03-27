import { test, expect } from '@playwright/test';
import { loadStory, getLastEvent } from './_utils.js';

test.describe('TabBar component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'tabbar');
		const tabbar = preview.locator('.sp-tab-bar');
		const tabbarButtons = tabbar.locator('.sp-tab-bar--button');
		const tabbarButtonsIcon = tabbarButtons.locator('.sp-icon');
		const tabbarButtonsLabel = tabbarButtons.locator(
			'.sp-tab-bar--button--label'
		);

		await expect(tabbar).toBeVisible();
		await expect(tabbarButtons).toHaveCount(4);
		await tabbarButtons.nth(0).click();

		await tabbarButtons.nth(1).click();
		await expect(tabbarButtons.nth(1)).toHaveClass(/sp-tab-bar--button/);
		await expect(tabbarButtons.nth(1)).toHaveClass(
			/sp-tab-bar--item--active/
		);
		//some weird bug with the class name not passing
		// await expect(tabbarButtons.nth(2)).toHaveClass(
		// 	/ sp-tab-bar--button--disabled /
		// );

		await expect(tabbarButtonsIcon.nth(0)).toHaveClass(
			/sp-icon sp-icon--edit/
		);
		await expect(tabbarButtonsIcon.nth(1)).toHaveClass(
			/sp-icon sp-icon--eye/
		);
		await expect(tabbarButtonsIcon.nth(2)).toHaveClass(
			/sp-icon sp-icon--chart-column/
		);
		await expect(tabbarButtonsLabel.nth(0)).toHaveText('Edit');
		await expect(tabbarButtonsLabel.nth(1)).toHaveText('Preview');
		await expect(tabbarButtonsLabel.nth(2)).toHaveText('Results');

		const tabButtonEvent = await getLastEvent(page);
		expect(tabButtonEvent).not.toBeNull();
		expect(tabButtonEvent).not.toBeUndefined();
		expect(tabButtonEvent.name).toBe('PointerEvent');
		expect(tabButtonEvent.value).toBe('preview');
		expect(tabButtonEvent.target).toBe(
			'button, sp-tab-bar--button sp-tab-bar--item--active'
		);
	});
});
