import { test, expect, type FrameLocator } from '@playwright/test';
import { setControl, loadStory, getLastEvent, getStyles } from './_utils.js';

test.describe('Radio component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'radio')) as FrameLocator;
	});

	test('basic', async ({ page }) => {
		const radio = canvas.getByLabel('Harry');
		const label = canvas.locator('label', { hasText: 'Harry' });
		const labelText = label.locator('.sp-radio--label');
		const radioDot = label.locator('.sp-radio--dot');
		const svg = radioDot.locator('svg');

		await expect(radio).not.toBeDisabled();
		await expect(radio).not.toBeFocused();
		await expect(radio).not.toBeChecked();
		await label.click();
		await expect(radio).toBeChecked();
		await expect(radio).toBeFocused();
		await expect(radio).toHaveAttribute('id', 'harry');
		await expect(radio).toHaveAttribute('name', 'stooge');
		await expect(radio).toHaveAttribute('value', 'Harry');

		const changeEvent = await getLastEvent(page);
		expect(changeEvent.name).toBe('change');

		await expect(label).toBeVisible();
		await expect(label).toHaveClass(/sp-radio/);
		await expect(label).not.toHaveClass(/sp-radio--prepend/);
		await expect(label).toHaveAttribute('for', 'harry');
		await expect(labelText).toBeVisible();
		expect(await labelText.textContent()).toBe('Harry');
		await expect(radioDot).toBeVisible();
		await expect(svg).toBeVisible();
	});

	test('disabled', async ({ page }) => {
		const radio = canvas.getByLabel('Harry');
		await expect(radio).not.toBeDisabled();
		await setControl(page, 'Disabled', 'checkbox', 'true');
		await expect(radio).toBeDisabled();
	});
	test('prepended', async ({ page }) => {
		const label = canvas.locator('label', { hasText: 'Harry' });
		await expect(label).toBeVisible();
		await setControl(page, 'Prepend label', 'checkbox', 'true');
		const labelStyles = await getStyles(label);
		await expect(label).toHaveClass(/sp-radio--prepend/);
		expect(labelStyles.flexDirection).toBe('row-reverse');
	});

	test('multiple', async () => {
		const radios = canvas.getByRole('radio');
		const labels = canvas.locator('label');
		const total = await radios.count();
		expect(total).toBe(3);

		for (let i = 0; i < total; i++) {
			const label = labels.nth(i);
			await label.click();
			for (let j = 0; j < total; j++) {
				const radio = radios.nth(j);
				if (j === i) {
					await expect(radio).toBeChecked();
				} else {
					await expect(radio).not.toBeChecked();
				}
			}
		}
	});
});
