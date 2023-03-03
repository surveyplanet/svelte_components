import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent } from './_utils.js';

test.describe('Form component', () => {
	test('should render basic form component', async ({ page }) => {
		const submit = page.getByRole('button');
		const form = page.locator('.sp-form');
		const name = page.getByLabel('First name');
		const lastName = page.getByLabel('Last name');
		const email = page.getByLabel('Email');
		const radios = page.getByRole('radio');
		const checkboxes = page.getByRole('checkbox');

		expect(form).toBeVisible();
		expect(lastName).toBeDefined();
		expect(email).toBeDefined();
		expect(radios.nth(0)).toBeDefined();
		expect(checkboxes).toHaveLength(2);
		expect(submit).toBeDefined();

		expect(form).toHaveClass('sp-form');

		expect(name).not.toBeDisabled();
		expect(name).not.toBeFocused();
		expect(name).toHaveAttribute('name', 'name');

		await name.type('John');
		expect(name).toHaveValue('John');

		expect(lastName).not.toBeDisabled();
		expect(lastName).not.toBeFocused();
		expect(lastName).toHaveAttribute('id', 'last_name');
		expect(lastName).toHaveAttribute('name', 'last_name');
		expect(lastName).toHaveAttribute('type', 'text');

		await lastName.type('Doe');

		await email.type('john.doe@example.com');
		expect(email).toHaveValue('john.doe@example.com');

		expect(radios).toHaveLength(3);

		await radios.nth(0).click();
		expect(radios.nth(0)).toBeChecked();
		expect(radios.nth(1)).not.toBeChecked();
		expect(radios.nth(3)).not.toBeChecked();

		await checkboxes.nth(0).click();
		await checkboxes.nth(1).click();
		expect(checkboxes.nth(0)).toBeChecked();
		expect(checkboxes.nth(0)).toBeChecked();
		await submit.click();
		// expect(res.args.submitHandler).toHaveBeenCalled();
	});
});
