import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent } from './_utils.js';

test.describe('Form component', () => {
	test('should render basic form component', async ({ page }) => {
		const preview = await loadStory(page, 'form');
		const submit = preview.getByRole('button');
		const form = preview.locator('.sp-form');
		const name = preview.getByLabel('First name');
		const lastName = preview.getByLabel('Last name');
		const email = preview.getByLabel('Email');
		const radios = preview.getByRole('radio');
		const checkboxes = preview.getByRole('checkbox');

		// await setControl(page, 'Id', 'textarea', 'form');

		expect(form).toBeDefined();
		expect(lastName).toBeDefined();
		expect(email).toBeDefined();
		expect(radios.nth(0)).toBeDefined();
		// // expect(checkboxes).toHaveLength(2);
		// expect(submit).toBeDefined();

		// // expect(form).toHaveClass(/sp-form/);

		// expect(name).toBeEnabled();
		// expect(name).not.toBeFocused();
		// expect(name).toHaveAttribute('name', 'name');
		// // await expect(form).toHaveAttribute('id', 'form');

		// await name.type('John');
		// expect(name).toHaveValue('John');

		// expect(lastName).toBeEnabled();
		// expect(lastName).not.toBeFocused();
		// expect(lastName).toHaveAttribute('id', 'last_name');
		// expect(lastName).toHaveAttribute('name', 'last_name');
		// expect(lastName).toHaveAttribute('type', 'text');

		// await lastName.type('Doe');

		// await email.type('john.doe@example.com');
		// expect(email).toHaveValue('john.doe@example.com');

		// expect(radios).toHaveLength(3);

		// await radios.nth(0).click();
		// await preview.locator(`label[for="larry"]`).click();
		await preview.getByText('Larry').click();
		await expect(preview.getByText('Larry')).toBeChecked();
		// expect(radios.nth(1)).not.toBeChecked();
		// expect(radios.nth(3)).not.toBeChecked();

		await checkboxes.nth(0).click();
		await checkboxes.nth(1).click();
		expect(checkboxes.nth(0)).toBeChecked();
		expect(checkboxes.nth(0)).toBeChecked();
		await submit.click();
		// expect(res.args.submitHandler).toHaveBeenCalled();
	});
});
