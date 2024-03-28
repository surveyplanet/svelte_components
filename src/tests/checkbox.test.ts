import { test, expect } from '@playwright/test';
import { loadStory, setControl, getAllEvents, getStyles } from './_utils.js';

test.describe('Checkbox component', () => {
	test('should render basic checkbox component', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');

		const input = preview.locator('input').nth(0);
		const input2 = preview.locator('input').nth(1);
		const inputDisabled = preview.locator('input').nth(4);

		const label = preview.locator('.sp-checkbox').nth(0);
		const label2 = preview.locator('.sp-checkbox').nth(1);

		const labelText = label.locator('.sp-checkbox--label');
		const labelText2 = label2.locator('.sp-checkbox--label');

		expect(input).toBeTruthy();
		expect(input2).toBeTruthy();
		await expect(label).toBeVisible();
		await expect(label2).toBeVisible();
		await expect(labelText).toHaveText('Plato');
		await expect(labelText2).toHaveText('Aristotle');

		await expect(input).not.toBeChecked();
		await expect(input2).not.toBeChecked();

		await label.click();
		await expect(input).toBeChecked();
		await expect(input2).not.toBeChecked();

		await label2.click();
		await expect(input).toBeChecked();
		await expect(input2).toBeChecked();

		await label.click();

		await expect(inputDisabled).not.toBeChecked();
		await expect(inputDisabled).toBeDisabled();

		const events = await getAllEvents(page);
		expect(events).toHaveLength(3);
		expect(events[0].name).toBe('Event');
		expect(events[0].value).toBe('[ "plato", "kant" ]');
		expect(events[0].target).toBe('input, sp-checkbox--input');
	});

	test('should render checkbox and prepend label', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const label = preview.locator('.sp-checkbox--item').nth(0);
		await setControl(page, 'Prepend Label', 'checkbox', 'true');

		await expect(label).toHaveClass(/sp-checkbox--prepend/);

		const labelStyles = await getStyles(label);
		expect(labelStyles.flexDirection).toBe('row');
	});

	test('should render checkbox in block', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const checkboxGroup = preview.locator('.sp-checkbox--group').nth(0);
		await setControl(page, 'Block', 'checkbox', 'true');

		await expect(checkboxGroup).toHaveClass(/sp-checkbox--block/);
	});
	test('should render checkbox in large', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		await setControl(page, 'Size', 'select', 'large');
		const label = preview.locator('.sp-checkbox--item').nth(0);

		await expect(label).toHaveClass(/sp-checkbox--large/);

		const labelStyles = await getStyles(label);
		// expect(labelStyles.width).toBe('73.4453px' || '72.7422px'); //inconsistent and changes from test to test
		expect(labelStyles.height).toBe('24px');
	});

	test('should render checkbox in small', async ({ page }) => {
		// this test is not working even on it's onw. It seems to have something to do with the utils functions
		const preview = await loadStory(page, 'checkbox');
		const label = preview.locator('.sp-checkbox--item').nth(0);
		await setControl(page, 'Size', 'select', 'small');

		await expect(label).toHaveClass(/sp-checkbox--small/);

		const labelStyles = await getStyles(label);
		// expect(labelStyles.width).toBe('64.0859px');
		expect(labelStyles.height).toBe('22px');
	});

	test('should render checkbox in medium', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const label = preview.locator('.sp-checkbox--item').nth(0);
		await setControl(page, 'Size', 'select', 'medium');

		await expect(label).toHaveClass(/sp-checkbox--medium/);

		const labelStyles = await getStyles(label);
		// expect(labelStyles.width).toBe('68.7656px');
		expect(labelStyles.height).toBe('22px');
	});
});
