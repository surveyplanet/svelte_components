import { test, expect } from '@playwright/test';
import { loadStory, getLastEvent, setControl } from './_utils.js';

test.describe('Navbar component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'navbar');
		const navbar = preview.locator('.sp-nav');
		const navbarLink = navbar.locator('a');
		const navLinkIcon = navbarLink.locator('.sp-icon');
		const navMenuTrigger = navbar.locator('.sp-nav--menu-trigger');
		const navMenu = page.locator('.sp-menu');
		const navMenuItems = navMenu.locator('.sp-menu--item');

		await expect(navbar).toBeVisible();
		await expect(navbarLink).toHaveCount(4);
		await expect(navbarLink.nth(0)).toHaveAttribute('href', '#');
		await expect(navLinkIcon.nth(0)).toHaveClass(/sp-icon sp-icon--edit/);
		await expect(navMenuTrigger).toBeVisible();

		// await navMenuTrigger.click();

		// await expect(navMenu).toBeVisible();

		// await navMenuTrigger.click();

		// await expect(navMenu).not.toBeVisible();

		// await navMenuTrigger.click();

		// await navMenuItems.nth(1).click();

		// await expect(navMenu).not.toBeVisible();

		// await navMenuTrigger.click();

		// await page.mouse.move(0, 0);

		// await expect(navMenu).not.toBeVisible();

		// // const linkevent = await getLastEvent(
	});

	test('vertical', async ({ page }) => {
		const preview = await loadStory(page, 'navbar');
		const navbar = preview.locator('.sp-nav');
		await setControl(page, 'Vertical', 'checkbox', 'true');

		await expect(navbar).toHaveClass(/sp-nav--vertical/);
	});
});
