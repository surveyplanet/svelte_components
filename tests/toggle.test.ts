import { test, expect, type FrameLocator } from '@playwright/test';
import { delay } from '@surveyplanet/utilities';
import { loadStory, setControl, getStyles } from './_utils.js';

test.describe('Toggle component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }, testInfo) => {
		canvas = (await loadStory(page, 'toggle')) as FrameLocator;
	});

	test('basic', async ({ page }) => {
		const toggle = canvas.getByRole('switch');
		const label = canvas.getByText('Toggle switch');
		const track = toggle.locator('.sp-toggle--track');
		const checkbox = toggle.locator('input[type=checkbox]');

		// await expect(checkbox).not.toBeVisible();
		await expect(toggle).toHaveClass(/sp-toggle--off/);
		await expect(toggle).toHaveAttribute('aria-checked', 'false');
		await expect(label).toBeVisible();
		await expect(label).toHaveClass(/sp-toggle--label/);

		checkbox.focus();
		await expect(checkbox).toBeFocused();
		await delay(401); // wait for css animation
		const trackStyles = await getStyles(track);
		expect(trackStyles.backgroundColor).toBe('rgb(236, 229, 255)');
		expect(trackStyles.boxShadow).toBe(
			'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(115, 122, 135) 0px 0px 0px 2px'
		);

		toggle.click();
		await expect(toggle).toHaveClass(/sp-toggle--on/);
		await expect(toggle).toHaveAttribute('aria-checked', 'true');
		// await expect(checkbox).toBeFocused();
		// expect(res.args.changeHandler).toHaveBeenCalled();
	});

	test('disabled', async ({ page }) => {
		await setControl(page, 'Disabled', 'checkbox', 'true');

		const toggle = canvas.getByRole('switch');
		const checkbox = canvas.locator('input');
		const track = toggle.locator('.sp-toggle--track');
		await expect(track).toBeVisible();
		await delay(401); // wait for css animation
		const trackStyles = await getStyles(track);
		await expect(checkbox).toBeDisabled();
		expect(trackStyles.backgroundColor).toBe('rgb(220, 222, 225)');
	});

	test('tall', async ({ page }) => {
		const toggle = canvas.getByRole('switch');
		await setControl(page, 'Tall', 'checkbox', 'true');
		await expect(toggle).toHaveClass(/sp-toggle--tall/);
	});

	test('prepended label', async ({ page }) => {
		// const toggle = canvas.getByRole('switch');
		await setControl(page, 'Label', 'text', 'Prepended');
		await setControl(page, 'Prepend label', 'checkbox', 'true');

		const label = canvas.getByText('Prepended');
		await expect(label).toBeVisible();
		await expect(label).toHaveClass(/sp-toggle--label/);
		await expect(label).toHaveClass(/sp-toggle--label-prepend/);
	});
});
