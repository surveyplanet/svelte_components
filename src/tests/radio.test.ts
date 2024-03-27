import { test, expect, type FrameLocator } from '@playwright/test';
import { setControl, loadStory, getLastEvent, getStyles } from './_utils.js';

test.describe('Radio component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'radio')) as FrameLocator;
	});

	test('basic', async ({ page }) => {
		const checkboxes = canvas.locator('.sp-radio--group');
		const radio = checkboxes.getByLabel('Harry');
		const label = checkboxes.locator('label', { hasText: 'Harry' });
		const labelText = label.locator('.sp-radio--label');
		const radioDot = label.locator('.sp-radio--dot');
		const svg = radioDot.locator('svg');

		await expect(radio).not.toBeDisabled();
		await expect(radio).not.toBeFocused();
		await expect(radio).not.toBeChecked();
		await label.click();
		await expect(radio).toBeChecked();
		await expect(radio).toBeFocused();
		await expect(radio).toHaveAttribute('value', 'harry');

		const changeEvent = await getLastEvent(page);
		expect(changeEvent.name).toBe('Event');
		expect(changeEvent.value).toBe('harry');
		expect(changeEvent.target).toBe('input, sp-radio--input');

		await expect(label).toBeVisible();
		await expect(label).toHaveClass(/sp-radio/);
		await expect(label).not.toHaveClass(/sp-radio--prepend/);
		await expect(label).toHaveAttribute('for', 'harry-radio');
		await expect(labelText).toBeVisible();
		expect(await labelText.textContent()).toBe('Harry');
		await expect(radioDot).toBeVisible();
		await expect(svg).toBeVisible();
	});

	test('prepended', async ({ page }) => {
		const label = canvas.locator('label', { hasText: 'Harry' });
		await expect(label).toBeVisible();
		await setControl(page, 'Prepend Label', 'checkbox', 'true');
		const labelStyles = await getStyles(label);
		await expect(label).toHaveClass(/sp-radio--prepend/);
		expect(labelStyles.flexDirection).toBe('row');
	});

	test('block', async ({ page }) => {
		const checkboxes = canvas.locator('.sp-form-control');
		await setControl(page, 'Block', 'checkbox', 'true');
		const labelStyles = await getStyles(checkboxes);
		await expect(checkboxes).toHaveClass(/sp-checkbox--block/);
		expect(labelStyles.display).toBe('flex');
	});
});
