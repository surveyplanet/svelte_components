import { test, expect, type FrameLocator } from '@playwright/test';
import { delay } from '@surveyplanet/utilities';
import { setControl, getStyles } from './_utils.js';

const getButtonUrl = (variant = 0) =>
	`/story/src-historie-textinput-textinput-story-svelte?variantId=src-historie-textinput-textinput-story-svelte-${variant}`; // cspell:disable-line

test.describe('Toggle component', () => {
	test('basic', async ({ page }) => {
		await page.goto(getButtonUrl());
		const input = page.getByRole('textbox');
		const label = page.getByText('Text input')
			?.parentElement as HTMLLabelElement;
		const inputWrapper = input.parentElement;

		expect(inputWrapper).toHaveClass(' sp-text-input');
		expect(input).toBeVisible();
		expect(input).toBeDefined();
		expect(input).not.toBeDisabled();
		expect(input.id).toBe('email');
		expect(input.placeholder).toBe('Placeholder');
		expect(input.readOnly).toBe(false);
		expect(label).toHaveClass(' sp-text-input--label');
		expect(input).toHaveAttribute('type', 'text');
		expect(input).toHaveAttribute('data-test', 'test');
		expect(input).toHaveAttribute('data-test2', 'test2');

		expect(input).not.toHaveFocus();
		userEvent.click(input);
		// expect(res.args.focusHandler).toHaveBeenCalled();
		expect(input).toHaveFocus();

		userEvent.type(input, 'Hello World');
		expect(input.value).toBe(`Hello World`);
		expect(res.args.keyupHandler).toHaveBeenCalled();
		expect(res.args.keydownHandler).toHaveBeenCalled();

		fireEvent.change(input, { target: { value: '' } });
		expect(res.args.changeHandler).toHaveBeenCalled();

		fireEvent.blur(input);
		expect(res.args.blurHandler).toHaveBeenCalled();
	});

	test('multiline', async ({ page }) => {
		await page.goto(getButtonUrl());
		const input: HTMLInputElement = page.getByRole('textbox');
		const label = page.getByText('Multiline input')
			?.parentElement as HTMLLabelElement;
		const value = ['Line one', 'Line two', 'Line three'].join('\n');

		expect(input).toBeVisible();
		expect(input).not.toHaveFocus();
		expect(input).not.toBeDisabled();
		expect(input.id).toBe('text-input-id');
		expect(input.placeholder).toBe('Placeholder');
		expect(input.readOnly).toBe(false);
		expect(label).toHaveClass(' sp-text-input--label');
		expect(input).toHaveAttribute('data-test', 'test');
		expect(input).toHaveAttribute('data-test2', 'test2');

		expect(input).not.toHaveFocus();
		userEvent.click(input);
		expect(input).toHaveFocus();

		userEvent.type(input, value);
		expect(input.value).toBe(value);
		expect(res.args.keyupHandler).toHaveBeenCalled();
		expect(res.args.keydownHandler).toHaveBeenCalled();

		fireEvent.change(input, { target: { value: '' } });
		expect(res.args.changeHandler).toHaveBeenCalled();

		fireEvent.blur(input);
		expect(res.args.blurHandler).toHaveBeenCalled();
	});

	test('disabled', async ({ page }) => {
		await page.goto(getButtonUrl());
		const input: HTMLInputElement = page.getByRole('textbox');
		expect(input.disabled).toBeTruthy();
		expect(input.readOnly).toBeFalsy();
	});

	test('readonly', async ({ page }) => {
		await page.goto(getButtonUrl());
		const input: HTMLInputElement = page.getByRole('textbox');
		expect(input.readOnly).toBeTruthy();
		expect(input.disabled).toBeFalsy();
	});

	test('noLabel', async ({ page }) => {
		await page.goto(getButtonUrl());
		const input: HTMLInputElement = page.getByRole('textbox');
		const children = input.parentElement!.children as HTMLCollection;

		for (const node of children) {
			expect(node.nodeName.toLowerCase()).not.toBe('label');
		}
	});

	test('validate', async ({ page }) => {
		await page.goto(getButtonUrl());
		const input: HTMLInputElement = page.getByRole('textbox');
		const inputWrapper = input.parentElement;

		expect(input).toHaveAttribute('data-validate-rules', 'require,email');
		fireEvent.change(input, { target: { value: 'invalid' } });
		await delay();
		expect(inputWrapper).toHaveClass('validation-error');
		const errLabel = page.getByLabelText(
			"What's the matter with you, you don't know your email address?"
		);
		expect(errLabel).toBeDefined();
	});

	test('masked', async ({ page }) => {
		await page.goto(getButtonUrl());
		const today = new Date();
		const year = today.getFullYear().toString();
		const month = (today.getMonth() + 1).toString().padStart(2, '0');
		const day = today.getDate();
		const value = `${year}-${month}-${day}`;

		const input: HTMLInputElement = page.getByRole('textbox');
		// fireEvent.change(input, { target: { value: 'invalid' } });
		userEvent.type(input, 'noop');
		expect(input.value).toBe('');
		userEvent.type(input, value);
		expect(input.value).toBe(value);
	});
});
