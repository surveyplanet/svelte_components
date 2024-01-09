import { test, expect, type FrameLocator } from '@playwright/test';
import { loadStory } from './_utils.js';
import { COLORS } from '../lib/_definitions.js';

test.describe('Icon component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'logo')) as FrameLocator;
	});

	test('basic', async () => {
		const logo = canvas.locator('svg');
		await expect(logo).toBeVisible();
		await expect(logo).toHaveClass(/sp-logo/);
		await expect(logo).toHaveAttribute('viewBox', '0 0 24 24');
		await expect(logo).toHaveAttribute('width', '256');
		await expect(logo).toHaveAttribute('height', '256');
		await expect(logo).toHaveAttribute('fill', 'none');

		const path = logo.locator('path').first();
		await expect(path).toBeVisible();
		await expect(path).toHaveClass(/sp-logo--path/);
		await expect(path).toHaveAttribute('fill', COLORS.black);
	});
});
