import { test, expect } from '@playwright/test';
import { loadStory } from './_utils.js';

test.describe('Breadcrumbs component', () => {
	test('basic', async ({ page }) => {
		const preview = await loadStory(page, 'breadcrumbs');

		const home = preview.getByText('Home');
		const ellipses = preview.getByText(
			'Our test survey will show you how its done as an example'
		);
		const contact = preview.getByText('Contact');
		const submit = preview.getByText('Submit');

		expect(home).toBeVisible();
		expect(ellipses).toBeVisible();
		expect(contact).toBeVisible();
		expect(submit).toBeVisible();

		expect(home).toHaveAttribute('href', '/');
		expect(ellipses).toHaveAttribute('href', '/about');
		expect(contact).toHaveAttribute('href', '/contact');
		expect(submit).toHaveAttribute('href', '/submit');

		const cursor = await home.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('cursor');
		});

		const color = await home.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('color');
		});

		expect(color).toBe('rgb(115, 122, 135)');
		expect(cursor).toBe('pointer');
	});
});
