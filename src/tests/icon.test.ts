import { test, expect, type FrameLocator } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';
import { COLORS } from '../lib/_definitions.js';

test.describe('Icon component', () => {
	let canvas: FrameLocator;
	let iconFrame: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'icon')) as FrameLocator;
		iconFrame = canvas.locator('id=icon-preview');
	});

	test('basic', async () => {
		const icon = iconFrame.locator('svg');
		await expect(icon).toBeVisible();
		const path = icon.locator('path').first();
		await expect(path).toBeVisible();
		await expect(icon).toHaveClass(/sp-icon/);
		await expect(icon).toHaveClass(/sp-icon--bell/);
		await expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
		await expect(icon).toHaveAttribute('width', '24');
		await expect(icon).toHaveAttribute('height', '24');
		await expect(icon).toHaveAttribute('fill', 'none');
		await expect(path).toHaveAttribute('stroke', COLORS.dark); //COLORS.black
	});

	test('light', async ({ page }) => {
		const icon = iconFrame.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Color', 'select', 'yellowDarker');
		const path = icon.locator('path').first();
		await expect(path).toBeVisible();
		await expect(path).toHaveAttribute('stroke', COLORS.yellowDarker);
	});

	test('large', async ({ page }) => {
		const size = '512';
		const icon = iconFrame.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', size);
		await setControl(page, 'Color', 'select', 'greenDark');

		const path = icon.locator('path').first();
		await expect(path).toBeVisible();
		await expect(icon).toHaveAttribute('width', size);
		await expect(icon).toHaveAttribute('height', size);
		await expect(path).toHaveAttribute('stroke', COLORS.greenDark);
	});

	test('small', async ({ page }) => {
		const size = '8';
		const icon = iconFrame.locator('svg');
		await expect(icon).toBeVisible();

		await setControl(page, 'Size', 'select', size);
		await setControl(page, 'Color', 'select', 'pinkDark');

		const path = icon.locator('path').first();
		await expect(path).toBeVisible();
		await expect(icon).toHaveAttribute('width', size);
		await expect(icon).toHaveAttribute('height', size);
		await expect(path).toHaveAttribute('stroke', COLORS.pinkDark);
	});
});
