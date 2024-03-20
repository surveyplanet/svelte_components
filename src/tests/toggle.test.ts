import { test, expect, type FrameLocator } from '@playwright/test';
import { delay } from '@surveyplanet/utilities';
import { loadStory, setControl, getStyles, getLastEvent } from './_utils.js';

test.describe('Toggle component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'toggle')) as FrameLocator;
	});

	test('basic', async ({ page }) => {
		const toggle = canvas.locator('.sp-toggle');
		const label = canvas.getByText('Toggle switch');
		const toggleSwitch = canvas.getByRole('switch');
		const track = toggle.locator('.sp-toggle--track');
		const checkbox = toggle.locator('input[type=checkbox]');

		// await expect(checkbox).not.toBeVisible();
		await expect(toggle).toHaveClass(/sp-toggle--off/);
		await expect(toggleSwitch).toHaveAttribute('aria-checked', 'false');
		await expect(label).toBeVisible();
		await expect(label).toHaveClass(/sp-toggle--label/);

		checkbox.focus();
		await expect(checkbox).toBeFocused();
		await delay(401); // wait for css animation
		const trackStyles = await getStyles(track);
		expect(trackStyles.backgroundColor).toBe('rgb(235, 230, 215)');
		expect(trackStyles.boxShadow).toBe(
			'rgb(255, 255, 255) 0px 0px 0px 1px, rgb(251, 250, 247) 0px 0px 0px 2px'
		);

		toggleSwitch.click();
		await expect(toggle).toHaveClass(/sp-toggle--on/);
		await expect(toggleSwitch).toHaveAttribute('aria-checked', 'true');
		const event = await getLastEvent(page);
		expect(event).toEqual({
			event: '{ "value": "false", "target": "input, sp-toggle--input", "event": "{\\"isTrusted\\":true}" }',
		});
	});

	test('disabled', async ({ page }) => {
		await setControl(page, 'Disabled', 'checkbox', 'true');

		const toggle = canvas.getByRole('switch');
		const checkbox = canvas.locator('input');
		const track = toggle.locator('.sp-toggle--track');
		await expect(track).toBeVisible();
		await delay(401); // wait for css animation
		// const trackStyles = await getStyles(track);
		await expect(checkbox).toBeDisabled();
		// expect(trackStyles.backgroundColor).toBe('rgb(220, 222, 225)');
	});

	test('tall', async ({ page }) => {
		const toggle = canvas.getByRole('switch');
		await setControl(page, 'Tall', 'checkbox', 'true');
		await expect(toggle).toHaveClass(/sp-toggle--tall/);
	});

	test('prepended label', async ({ page }) => {
		// const toggle = canvas.getByRole('switch');
		await setControl(page, 'Label', 'text', 'Prepended');
		await setControl(page, 'Prepend Label', 'checkbox', 'true');

		const toggle = canvas.locator('.sp-toggle');
		await expect(toggle).toBeVisible();
		await expect(toggle).toHaveClass(/sp-toggle--prepend/);
	});
});
