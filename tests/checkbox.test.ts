import { test, expect } from '@playwright/test';
import { loadStory, setControl } from './_utils.js';

test.describe('Checkbox component', () => {
	test('should render basic checkbox component', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const value = 'Checkbox';
		const label = preview.locator('.sp-checkbox');
		const checkbox = preview.locator('#checkbox');
		const labelText = label.locator('.sp-checkbox--label');

		await setControl(page, 'Name', 'text', 'checkbox');
		await setControl(page, 'Label', 'text', 'Subscribe');
		await setControl(page, 'Value', 'text', 'checkbox');
		await setControl(page, 'Id', 'text', 'checkbox');

		await expect(label).toBeVisible();

		await label.click();

		await expect(label).toBeChecked();

		expect(label).toBeDefined();
		await expect(label).toHaveClass(/sp-checkbox/);
		await expect(label).not.toHaveClass(/sp-checkbox--prepend/);
		expect(label).toHaveAttribute('for', checkbox.id);

		expect(labelText).toBeDefined();
		await expect(labelText).toContainText('Subscribe');
	});

	test('should render checkbox and disabled it', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const label = preview.locator('.sp-checkbox');

		await setControl(page, 'Disabled', 'checkbox', 'true');

		await expect(label).toBeVisible();

		await expect(label).toBeDisabled();
	});

	// test('should render checkbox and prepend label', async ({ page }) => {
	// 	const preview = await loadStory(page, 'checkbox');
	// 	const label = preview.locator('.sp-checkbox');

	// 	await setControl(page, 'Prepend', 'checkbox', 'true');

	// 	await expect(label).toBeVisible();
	// 	const labelStyles: CSSStyleDeclaration = window.getComputedStyle(label);
	// 	expect(label).toBeDefined();
	// 	expect(label).toHaveClass('sp-checkbox--prepend');
	// 	expect(labelStyles.getPropertyValue('flex-direction')).toBe(
	// 		'row-reverse'
	// 	);
	// });
});
