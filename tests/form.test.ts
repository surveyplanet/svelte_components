import { test, expect } from '@playwright/test';
import { loadStory, setControl, getLastEvent } from './_utils.js';

test.describe('Form component', () => {
	test('should render basic form component', async ({ page }) => {
		const preview = await loadStory(page, 'form');
		const submit = preview.getByRole('button');
		const form = preview.locator('.sp-form');
		const firstName = preview.getByLabel('First name');
		const lastName = preview.getByLabel('Last name');
		const email = preview.getByLabel('Email');
		const radios = preview.getByRole('radio');

		await setControl(page, 'Id', 'text', 'form');
		await expect(form).toHaveAttribute('id', 'form');

		expect(form).toBeDefined();
		expect(lastName).toBeDefined();
		expect(email).toBeDefined();
		expect(radios).toBeDefined();
		expect(submit).toBeDefined();

		await expect(form).toHaveClass(/sp-form */);

		await expect(firstName).toBeEnabled();
		expect(firstName).toHaveAttribute('name', 'First name');

		await firstName.type('John');
		expect(firstName).toHaveValue('John');

		expect(lastName).toBeEnabled();
		expect(lastName).not.toBeFocused();
		expect(lastName).toHaveAttribute('id', 'last_name');
		expect(lastName).toHaveAttribute('name', 'last_name');
		expect(lastName).toHaveAttribute('type', 'text');

		await lastName.type('Doe');

		await email.type('john.doe@example.com');
		expect(email).toHaveValue('john.doe@example.com');

		await preview.getByText('Larry').click();
		await expect(preview.getByText('Larry')).toBeChecked();
		await expect(preview.getByText('Curly')).not.toBeChecked();
		await expect(preview.getByText('Moe')).not.toBeChecked();

		await preview.getByText('Accept').click();
		await preview.getByRole('switch').click();
		await expect(preview.getByText('Accept')).toBeChecked();
		await expect(preview.getByRole('switch')).toBeChecked();
		await submit.click();

		const event = await getLastEvent(page);
		expect(event.name).toBe('submit');
	});
});
