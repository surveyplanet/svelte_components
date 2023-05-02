import { test, expect } from '@playwright/test';
import { loadStory, getAllEvents, setControl } from './_utils.js';

test.describe('Navbar component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'navbar');
		const navbar = preview.locator('.sp-nav');
		const navbarLink = navbar.locator('a');
		const navLinkIcon = navbarLink.locator('.sp-icon');
		const navMenuTrigger = navbar.locator('.sp-nav--menu-trigger');

		await expect(navbar).toBeVisible();
		await expect(navbarLink).toHaveCount(4);
		await expect(navbarLink.nth(0)).toHaveAttribute('href', '#');
		await navbarLink.nth(0).click();
		await expect(navLinkIcon.nth(0)).toHaveClass(/sp-icon sp-icon--edit/);
		await expect(navMenuTrigger).toBeVisible();

		await navMenuTrigger.click();

		const navMenu = preview.locator('.sp-menu');
		const navMenuItems = navMenu.locator('.sp-menu--item');

		await expect(navMenu).toBeVisible();

		await navMenuTrigger.click();

		await expect(navMenu).not.toBeVisible();

		await navMenuTrigger.click();

		await navMenuItems.nth(1).click();

		await expect(navMenu).not.toBeVisible();

		await navMenuTrigger.click();

		await navMenuItems.nth(3).click();

		await page.locator('body').click();

		await expect(navMenu).not.toBeVisible();

		const events = await getAllEvents(page);

		const navLinkEvent = events.filter((i) => i.name === 'nav-link').length;
		const navMenuClickEvent = events.filter(
			(i) => i.name === 'click'
		).length;
		const navMenuUpdateEvent = events.filter((i) => i.name === 'update');

		expect(navLinkEvent).toBe(1);
		expect(navMenuClickEvent).toBe(1);
		expect(navMenuUpdateEvent).toHaveLength(1);
	});

	test('vertical', async ({ page }) => {
		const preview = await loadStory(page, 'navbar');
		const navbar = preview.locator('.sp-nav');
		await setControl(page, 'Vertical', 'checkbox', 'true');

		await expect(navbar).toHaveClass(/sp-nav--vertical/);
	});
});
