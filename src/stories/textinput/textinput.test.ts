import { within, userEvent, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { delay } from '@surveyplanet/utilities';

export const basic = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	const label = canvas.getByText('Text input')
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
};

export const multiline = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	const label = canvas.getByText('Multiline input')
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

	userEvent.type(input, 'Hello World');
	expect(input.value).toBe(`Hello World`);
	expect(res.args.keyupHandler).toHaveBeenCalled();
	expect(res.args.keydownHandler).toHaveBeenCalled();

	fireEvent.change(input, { target: { value: '' } });
	expect(res.args.changeHandler).toHaveBeenCalled();

	fireEvent.blur(input);
	expect(res.args.blurHandler).toHaveBeenCalled();
};

export const disabled = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input.disabled).toBeTruthy();
	expect(input.readOnly).toBeFalsy();
};

export const readonly = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input.readOnly).toBeTruthy();
	expect(input.disabled).toBeFalsy();
};

export const noLabel = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	const children = input.parentElement!.children as HTMLCollection;

	for (const node of children) {
		expect(node.nodeName.toLowerCase()).not.toBe('label');
	}
};

export const validate = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	const inputWrapper = input.parentElement;

	expect(input).toHaveAttribute('data-validate-rules', 'require,email');
	fireEvent.change(input, { target: { value: 'invalid' } });
	await delay();
	expect(inputWrapper).toHaveClass('validation-error');
	const errLabel = canvas.getByLabelText(
		"What's the matter with you, you don't know your email address?"
	);
	expect(errLabel).toBeDefined();
};

export const masked = async (res: StoryBookPlayArgs) => {
	const today = new Date();
	const year = today.getFullYear().toString();
	const month = (today.getMonth() + 1).toString().padStart(2, '0');
	const day = today.getDate();
	const value = `${year}-${month}-${day}`;

	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	// fireEvent.change(input, { target: { value: 'invalid' } });
	userEvent.type(input, 'noop');
	expect(input.value).toBe('');
	userEvent.type(input, value);
	expect(input.value).toBe(value);
};
