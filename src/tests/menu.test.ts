import { test, expect } from '@playwright/test';
import { loadStory } from './_utils.js';

test.describe('Menu component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'menu');
		const menu = preview.locator('.sp-menu');
		const items = menu.locator('.sp-menu--item');
		const categories = menu.getByText('Categories');

		await expect(menu).toBeVisible();
		await expect(items).toHaveCount(6);

		await items.nth(4).click();
		const backButton = menu.locator('.sp-menu--back-btn');
		await expect(backButton.locator('.sp-icon--arrow-left')).toBeVisible();
		await expect(backButton).toBeVisible();

		await expect(items.nth(1)).toHaveClass(/sp-menu--item--selected/);
		await expect(items.nth(1)).toHaveClass(/sp-menu--item--inline/);
		await backButton.click();

		await expect(categories).toBeVisible();
		await categories.click();

		await expect(items).toHaveCount(3);
		const fruit = menu.getByText('Fruit');
		await expect(fruit).toBeVisible();
		await fruit.click();

		await expect(items).toHaveCount(5);
		const strawberry = items.nth(0);
		await expect(strawberry).toBeVisible();
		await expect(strawberry.locator('.sp-menu--item--meta')).toHaveText(
			'(52)'
		);
		await expect(strawberry).toHaveText('Strawberry   (52) ');

		const apple = items.nth(2);
		await expect(apple).toBeVisible();
		await expect(apple).toHaveClass(/sp-menu--item/);
		await expect(apple).toHaveClass(/sp-menu--item--submenu/);
		await expect(apple).toHaveText('Apple');
		const appleStyles = await apple.locator('button').evaluate((el) => {
			return window.getComputedStyle(
				el,
				':before'
			) as CSSStyleDeclaration;
		});

		expect(appleStyles.position).toBe('absolute');
		expect(appleStyles.right).toBe('16px');
		expect(appleStyles.backgroundImage).toBe(
			'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjciIGZpbGw9Im5vbmUiPjxwYXRoIHN0cm9rZT0iIzE2MjEzNyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0ibTEuMDk1IDYuMTQzIDIuNDE2LTIuNDE2LTIuNDk0LTIuNDk0Ii8+PC9zdmc+")'
		);
		expect(appleStyles.backgroundPositionX).toBe('50%');
		expect(appleStyles.backgroundPositionY).toBe('50%');
		expect(appleStyles.backgroundRepeat).toBe('no-repeat');

		await apple.click();

		await expect(items).toHaveCount(8);
		await expect(items.nth(4)).toHaveClass(/sp-menu--item--selected/);

		await backButton.click();
		await backButton.click();

		await expect(items).toHaveCount(3);
		const category = items.nth(2);
		await expect(category).toHaveClass(/sp-menu--item--divide/);
		await expect(category.locator('#new-category')).toBeVisible();
		await category.click();
		await expect(menu).not.toBeVisible();

		// test events
	});
	test('Arrow navigation', async ({ page }) => {
		const preview = await loadStory(page, 'menu');
		const menu = preview.locator('.sp-menu');
		const items = menu.locator('.sp-menu--item');

		await expect(menu).toBeVisible();
		await expect(items).toHaveCount(6);

		await page.click('body');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowDown');
		await page.keyboard.press('ArrowUp');
		await page.keyboard.press('ArrowRight');

		await expect(items).toHaveCount(3);
	});
});
