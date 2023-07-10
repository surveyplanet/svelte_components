import { test, expect, type FrameLocator } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';
import { COLORS } from '../lib/_definitions.js';

test.describe('Icon component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'icon')) as FrameLocator;
	});

	test('basic', async () => {
		const icon = canvas.locator('svg');
		await expect(icon).toBeVisible();
		const path = icon.locator('path').first();
		await expect(path).toBeVisible();
		await expect(icon).toHaveClass(/sp-icon/);
		await expect(icon).toHaveClass(/sp-icon--bell/);
		await expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
		await expect(icon).toHaveAttribute('width', '24');
		await expect(icon).toHaveAttribute('height', '24');
		await expect(icon).toHaveAttribute('fill', 'none');
		await expect(path).toHaveAttribute('stroke', COLORS.black);
	});

	test('light', async ({ page }) => {
		const icon = canvas.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Color', 'select', 'YellowDarker');
		const path = icon.locator('path').first();
		await expect(path).toBeVisible();
		await expect(path).toHaveAttribute('stroke', COLORS.yellowDarker);
	});

	test('large', async ({ page }) => {
		const size = '512';
		const icon = canvas.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', size);
		await setControl(page, 'Color', 'select', 'GreenDark');

		const path = icon.locator('path').first();
		await expect(path).toBeVisible();
		await expect(icon).toHaveAttribute('width', size);
		await expect(icon).toHaveAttribute('height', size);
		await expect(path).toHaveAttribute('stroke', COLORS.greenDark);
	});

	test('small', async ({ page }) => {
		const size = '8';
		const icon = canvas.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', size);
		await setControl(page, 'Color', 'select', 'PinkDark');

		const path = icon.locator('path').first();
		await expect(path).toBeVisible();
		await expect(icon).toHaveAttribute('width', size);
		await expect(icon).toHaveAttribute('height', size);
		await expect(path).toHaveAttribute('stroke', COLORS.pinkDark);
	});
});
