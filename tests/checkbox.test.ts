import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent } from './_utils.js';

test.describe('Checkbox component', () => {
	test.only('should render basic checkbox component', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const label = preview.locator('.sp-checkbox');
		const labelText = label.locator('.sp-checkbox--label');

		// const id = await checkbox.getAttribute('id');

		await setControl(page, 'Name', 'text', 'checkbox');
		await setControl(page, 'Label', 'text', 'Subscribe');
		await setControl(page, 'Value', 'text', 'checkbox');
		await setControl(page, 'Id', 'text', 'checkbox');

		await expect(label).toBeVisible();

		await label.click();
		// const event = await getLastEvent(page);
		// expect(event.name).toBe('change');

		await expect(label).toBeChecked();

		expect(label).toBeDefined();
		await expect(label).toHaveClass(/sp-checkbox/);
		await expect(label).not.toHaveClass(/sp-checkbox--prepend/);
		await expect(label).toHaveAttribute('for', `checkbox`);

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

	test('should render checkbox and prepend label', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const label = preview.locator('.sp-checkbox');

		await setControl(page, 'Prepend label', 'checkbox', 'true');

		await expect(label).toBeVisible();
		const labelStyles = await label.evaluate((el) => {
			return window
				.getComputedStyle(el)
				.getPropertyValue('flex-direction');
		});
		expect(label).toBeDefined();
		await expect(label).toHaveClass(/sp-checkbox--prepend/);
		expect(labelStyles).toBe('row-reverse');
	});
});
