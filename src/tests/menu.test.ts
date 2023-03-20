import { test, expect } from '@playwright/test';
import { loadStory, setControl, getStyles } from './_utils.js';

test.describe('Menu component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'menu');
		const menu = preview.locator('.sp-menu');
		const items = menu.locator('.sp-menu--item');
		const categories = menu.getByText('Categories');

		await expect(menu).toBeVisible();
		await expect(items).toHaveCount(6);

		const backButton = menu.locator('.sp-menu--back-btn');

		await items.nth(4).click();
		await expect(items.nth(1)).toHaveClass(/sp-menu--item--selected/);
		await expect(items.nth(1)).toHaveClass(/sp-menu--item--inline/);

		await expect(backButton).toBeVisible();
		// await expect(backButton).toHaveText('Back');
		// test gives:  Expected string: "Back"
		//              Received string: "icon arrowLeft Back"
		await expect(backButton.locator('.sp-icon--arrowLeft')).toBeVisible();
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
		await expect(strawberry.locator('.sp-menu--item--label')).toHaveText(
			'Strawberry'
		);

		const apple = items.nth(2);
		await expect(apple).toBeVisible();
		await expect(apple).toHaveClass(/sp-menu--item/);
		await expect(apple).toHaveClass(/sp-menu--item--submenu/);
		await expect(apple).toHaveText('Apple');
		// const appleStyles = getStyles(apple);
		// await expect(appleStyles).toHaveProperty('display', 'flex');
		// // await expect(arrow).toHaveProperty(
		// // 	'background-image',
		// // 	'	data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDov…uMTQzIDIuNDE2LTIuNDE2LTIuNDk0LTIuNDk0Ii8+PC9zdmc+'
		// // );
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
	});
});
