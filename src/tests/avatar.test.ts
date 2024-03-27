import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent } from './_utils.js';

test.describe('Avatar component', () => {
	test('should render basic avatar component in Medium size', async ({
		page,
	}) => {
		const preview = await loadStory(page, 'avatar');

		const value = 'medium';
		await setControl(page, 'Size', 'select', value);
		const avatar = preview.getByRole('button');
		const height = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('height');
		});
		const width = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('width');
		});
		const borderRadius = await avatar.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('border-radius');
		});
		const img = preview.getByRole('img');
		const src = await img.evaluate((el) => {
			return el.getAttribute('src');
		});
		const alt = await img.evaluate((el) => {
			return el.getAttribute('alt');
		});
		expect(avatar).toBeVisible();
		await expect(avatar).toHaveClass(/sp-avatar/);
		await expect(avatar).toHaveClass(/sp-avatar--medium/);
		expect(height).toBe('48px');
		expect(width).toBe('48px');
		expect(borderRadius).toBe('100%');
		expect(src).toBe(
			'https://media.surveyplanet.com/w_96,h_96,f_cover/testing/family.jpeg'
		);
		expect(alt).toBe('profile');

		await expect(avatar).toHaveAttribute('aria-label', 'profile image');

		await avatar.click();
		const lastEvent = await getLastEvent(page);
		expect(lastEvent.name).toBe('PointerEvent');
		expect(lastEvent.value).toBe('not defined');
		expect(lastEvent.target).toBe('img,');
		// expect(lastEvent.data?.detail).toBe('[object Object]');
	});

	test('should render avatar as large', async ({ page }) => {
		const preview = await loadStory(page, 'avatar');
		const value = 'large';
		await setControl(page, 'Size', 'select', value);

		const avatar = preview.getByRole('button');
		// const bgColor = await avatar.evaluate((el) => {
		// 	return window
		// 		.getComputedStyle(el)
		// 		.getPropertyValue('background-color');
		// });
		const height = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('height');
		});
		const width = await avatar.evaluate((el) => {
			return window.getComputedStyle(el).getPropertyValue('width');
		});
		const borderRadius = await avatar.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('border-radius');
		});
		const img = preview.getByRole('img');
		const src = await img.evaluate((el) => {
			return el.getAttribute('src');
		});
		const alt = await img.evaluate((el) => {
			return el.getAttribute('alt');
		});

		expect(avatar).toBeVisible();
		await expect(avatar).toHaveClass(/sp-avatar/);
		await expect(avatar).toHaveClass(/sp-avatar--large/);
		// expect(bgColor).toBe('rgb(158, 228, 250)');
		expect(height).toBe('64px');
		expect(width).toBe('64px');
		expect(borderRadius).toBe('100%');
		expect(src).toBe(
			'https://media.surveyplanet.com/w_128,h_128,f_cover/testing/family.jpeg'
		);
		expect(alt).toBe('profile');
	});

	test('should render avatar as disabled and small', async ({ page }) => {
		const preview = await loadStory(page, 'avatar');

		const value = 'small';
		await setControl(page, 'Size', 'select', value);
		const avatar = preview.locator('.sp-avatar');
		await setControl(page, 'Disabled', 'checkbox', 'true');

		await expect(avatar).toBeVisible();
		await expect(avatar).toHaveAttribute('role', 'presentation');
	});
});
