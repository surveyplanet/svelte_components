import { test, expect, type FrameLocator } from '@playwright/test';
import { setControl, loadStory, getAllEvents } from './_utils.js';

test.describe('Text Input component', () => {
	let canvas: FrameLocator;

	test.beforeEach(async ({ page }) => {
		canvas = (await loadStory(page, 'textinput')) as FrameLocator;
	});

	test('basic', async ({ page }) => {
		const value = '11! This is something new I wish I had 11 too!';
		const wrapper = canvas.locator('.sp-text-input').first();
		const input = wrapper.getByRole('textbox');
		const label = wrapper.getByText('Text input');

		await expect(wrapper).toBeVisible();
		await expect(input).toBeVisible();
		await expect(input).not.toBeDisabled();
		await expect(input).not.toHaveAttribute('readonly', 'true');
		await expect(input).toHaveAttribute('id', 'basic-text');
		await expect(input).toHaveAttribute('name', 'basic-text');
		await expect(input).toHaveAttribute('placeholder', 'Placeholder');
		await expect(label).toHaveClass(/sp-text-input--label/);
		await expect(input).toHaveAttribute('type', 'text');
		await expect(input).not.toBeFocused();

		await input.click();
		await expect(input).toBeFocused();
		input.type(value);
		await expect(input).toHaveValue(value);
		// const events = await getAllEvents(page);
		// expect(events.length > 0).toBeTruthy();
		// const totalKeyUps = events.filter((i) => i.name == 'keyup').length;
		// const totalKeyDowns = events.filter((i) => i.name == 'keydown').length;
		// expect(events[0].name).toBe('focus');
		// expect(totalKeyUps).toEqual(value.length);
		// expect(totalKeyDowns).toEqual(value.length);
		// expect(events[events.length - 1].name).toBe('change');
	});

	// test('multiline', async ({ page }) => {
	// 	await setControl(page, 'Multiline', 'checkbox', 'true');
	// 	const value = '11!\nThis is something new I wish I had 11 too!';
	// 	const wrapper = canvas.locator('.sp-text-input').first();
	// 	const input = wrapper.getByRole('textbox');

	// 	await input.click();
	// 	await expect(input).toBeFocused();
	// 	input.type(value);
	// 	await expect(input).toHaveValue(value);
	// 	const events = await getAllEvents(page);
	// 	// expect(events.length > 0).toBeTruthy();
	// 	// const totalKeyUps = events.filter((i) => i.name == 'keyup').length;
	// 	// const totalKeyDowns = events.filter((i) => i.name == 'keydown').length;
	// 	// expect(events[0].name).toBe('focus');
	// 	// expect(totalKeyUps).toEqual(value.length);
	// 	// expect(totalKeyDowns).toEqual(value.length);
	// 	// expect(events[events.length - 1].name).toBe('change');
	// });

	test('disabled', async ({ page }) => {
		const input = canvas.getByLabel('Text input');
		await expect(input).not.toBeDisabled();
		await setControl(page, 'Disabled', 'checkbox', 'true');
		await expect(input).toBeDisabled();
	});

	test('readonly', async ({ page }) => {
		const input = canvas.getByLabel('Text input');
		await setControl(page, 'Readonly', 'checkbox', 'true');
		const readOnlyAttr = await input.getAttribute('readonly');
		expect(readOnlyAttr).not.toBeNull(); // readonly doesn't have a value
	});

	test.skip('validate', async ({ page }) => {
		const validationRules = ['required', 'email'];
		const validationMsg =
			"What's the matter with you, you don't know your email address?";
		const input = canvas.getByLabel('Text input');
		const wrapper = canvas.locator('.sp-text-input').first();
		await setControl(
			page,
			'Validation rules',
			'json',
			JSON.stringify(validationRules)
		);
		await setControl(page, 'Validation message', 'text', validationMsg);
		await expect(input).toHaveAttribute('id', 'basic-text');
		await expect(input).toHaveAttribute(
			'data-validate-rules',
			validationRules.join(',')
		);
		await input.type('invalid email address');
		await input.press('Tab');

		await expect(wrapper).toHaveClass(/validation-error/);
		const errLabel = canvas.getByText(validationMsg);
		await expect(errLabel).toBeVisible();
		await expect(errLabel).toHaveAttribute('for', 'basic-text');
	});

	test.skip('masked', async ({ page }) => {
		const today = new Date();
		const year = today.getFullYear().toString();
		const month = (today.getMonth() + 1).toString().padStart(2, '0');
		const day = today.getDate().toString().padStart(2, '0');
		const value = `${year}-${month}-${day}`;
		const cleaveOptions = {
			date: true,
			delimiter: '-',
			datePattern: ['Y', 'm', 'd'],
		};
		await setControl(
			page,
			'Mask options',
			'json',
			JSON.stringify(cleaveOptions)
		);
		await setControl(page, 'Placeholder', 'text', 'YYYY-MM-DD');

		const input = canvas.getByRole('textbox');
		input.type('noop');
		await expect(input).toHaveValue('');
		input.type(value.replace('-', ''));
		await expect(input).toHaveValue(value);
	});
});
