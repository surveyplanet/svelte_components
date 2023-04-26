import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent } from './_utils.js';

test.describe('Navbar component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'navbar');
		const navbar = preview.locator('.sp-nav');
		const navbarLink = navbar.locator('a');
		const navLinkIcon = navbarLink.locator('.sp-icon');
		const navMenuButton = navbar.locator('.sp-nav--menu-trigger');
		const navMenu = navbar.locator('.sp-menu');

		await expect(navbar).toBeVisible();
		await expect(navbarLink).toHaveCount(4);
		await expect(navbarLink.nth(0)).toHaveAttribute('href', '#');
		await expect(navLinkIcon.nth(0)).toHaveClass(/sp-icon sp-icon--edit/);
		await expect(navMenuButton).toBeVisible();

		await navMenuButton.click();

		await expect(navMenu).not.toBeVisible();

		await navMenuButton.click();

		await page.mouse.move(0, 0);

		await expect(navMenu).not.toBeVisible();
	});
});
