import { test, expect } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Menu component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'menu');
		await setControl(page, 'Visible', 'checkbox', 'true');
		const menu = preview.locator('.sp-menu');
		const title = menu.getByText('Menu');
		const subtitle = menu.getByText('Subtitle');
		const body = menu.getByText('And visit not');
		const closeBtn = menu.getByRole('button');

		await expect(menu).toBeVisible();
		await expect(title).toBeVisible();
		await expect(subtitle).toBeVisible();
		await expect(body).toBeVisible();
		await expect(closeBtn).toBeVisible();

		await expect(menu).toHaveClass(/sp-menu/);
		// await expect(menu).toHaveClass(/sp-menu--medium/);

		// await expect(closeBtn).toHaveClass(/sp-menu--header--close-btn/);
		// await expect(title).toHaveClass(/sp-menu--header--title/);
		// await expect(subtitle).toHaveClass(/sp-menu--header--subtitle/);
		// await expect(body).toHaveClass(/sp-menu--body/);
		// await closeBtn.click();
		// await expect(menu).not.toBeVisible();
	});
});
