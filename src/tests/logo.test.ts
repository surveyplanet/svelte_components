import { test, expect, type FrameLocator } from '@playwright/test';
import { loadStory } from './_utils.js';
import { COLORS } from '../lib/_definitions.js';

test.describe('Icon component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'logo')) as FrameLocator;
	});

	test('basic', async () => {
		const logoWrapper = canvas.locator('div');
		const logo = logoWrapper.locator('svg');
		await expect(logoWrapper).toBeVisible();
		await expect(logoWrapper).toHaveClass(/sp-logo/);

		await expect(logo).toHaveAttribute('viewBox', '0 0 24 24');
		await expect(logo).toHaveAttribute('width', '100%');
		await expect(logo).toHaveAttribute('height', '100%');
		await expect(logo).toHaveAttribute('fill', 'none');

		const path = logo.locator('path').first();
		await expect(path).toBeVisible();
		await expect(path).toHaveAttribute('clip-rule', 'evenodd');
		await expect(path).toHaveAttribute('fill', COLORS.black);
	});
});
