import { test, expect } from '@playwright/test';
import {
	loadStory,
	setControl,
	getAllEvents,
	getStyles,
	getLastEvent,
} from './_utils.js';

test.describe('Checkbox component', () => {
	test('should render basic checkbox component', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');

		const input = preview.locator('input').nth(0);
		const input2 = preview.locator('input').nth(1);

		const label = preview.locator('.sp-checkbox').nth(0);
		const label2 = preview.locator('.sp-checkbox').nth(1);

		const labelText = label.locator('.sp-checkbox--label');
		const labelText2 = label2.locator('.sp-checkbox--label');

		expect(input).toBeTruthy();
		expect(input2).toBeTruthy();
		await expect(label).toBeVisible();
		await expect(label2).toBeVisible();
		await expect(labelText).toHaveText('Primary');
		await expect(labelText2).toHaveText('Secondary');

		await expect(input).not.toBeChecked();
		await expect(input2).not.toBeChecked();

		await label.click();
		await expect(input).toBeChecked();
		await expect(input2).not.toBeChecked();

		await label2.click();
		await expect(input).toBeChecked();
		await expect(input2).toBeChecked();

		await label.click();

		await setControl(page, 'Id', 'text', '123');
		await setControl(page, 'Value', 'text', '123');
		await setControl(page, 'Name', 'text', 'abc');
		await setControl(page, 'Checked', 'checkbox', 'true');

		await expect(input).toHaveAttribute('id', '123');
		await expect(input).toHaveAttribute('value', '123');
		await expect(input).toHaveAttribute('name', 'abc');
		await expect(input).toBeChecked();

		const events = await getAllEvents(page);
		const changeEvents = events.filter((i) => i.name === 'change').length;
		expect(changeEvents).toBe(3);
	});
	test('should render checkbox and disabled it', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const input = preview.locator('input').nth(0);
		setControl(page, 'Disabled', 'checkbox', 'true');

		await expect(input).toBeDisabled();
	});

	test('should render checkbox and prepend label', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const label = preview.locator('.sp-checkbox').nth(0);
		setControl(page, 'Prepend label', 'checkbox', 'true');

		await expect(label).toHaveClass(/sp-checkbox--prepend/);

		const labelStyles = await getStyles(label);
		expect(labelStyles.flexDirection).toBe('row-reverse');
	});

	test('should render checkbox in small', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		const label = preview.locator('.sp-checkbox').nth(0);
		setControl(page, 'Size', 'select', 'small');

		await expect(label).toHaveClass(/sp-checkbox--small/);

		const labelStyles = await getStyles(label);
		expect(labelStyles.width).toBe('77.9453px');
		expect(labelStyles.height).toBe('22px');
	});

	test('should render checkbox in large', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		setControl(page, 'Size', 'select', 'large');
		const label = preview.locator('.sp-checkbox').nth(0);

		await expect(label).toHaveClass(/sp-checkbox--large/);

		const labelStyles = await getStyles(label);
		expect(labelStyles.width).toBe('91.9219px');
		expect(labelStyles.height).toBe('24px');
	});

	test('should render checkbox in medium', async ({ page }) => {
		const preview = await loadStory(page, 'checkbox');
		setControl(page, 'Size', 'select', 'medium');
		const label = preview.locator('.sp-checkbox').nth(0);

		await expect(label).toHaveClass(/sp-checkbox--medium/);

		const labelStyles = await getStyles(label);
		expect(labelStyles.width).toBe('84.9375px');
		expect(labelStyles.height).toBe('22px');
	});
});
