import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const basic = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	const label: HTMLLabelElement = canvas.getByText('Label');

	expect(input).toBeVisible();
	expect(input).toBeDefined();

	expect(input).not.toBeDisabled();
	expect(input).toHaveClass(' sp-text-input--input');
	expect(input.placeholder).toBe('Placeholder');

	expect(input.getAttribute('data-test')).toBe('test');
	expect(input.getAttribute('data-test2')).toBe('test2');

	userEvent.type(input, 'Hello World');
	expect(input).toHaveFocus();
	expect(input.value).toBe(`Hello World`);
	expect(input.readOnly).toBe(false);
	expect(label).toHaveClass(' sp-text-input--label--text');
	userEvent.click(document.body);
	expect(input).not.toHaveFocus();

	expect(res.args.changeHandler).toHaveBeenCalled();
	expect(res.args.keyupHandler).toHaveBeenCalled();
	expect(res.args.keydownHandler).toHaveBeenCalled();
	expect(res.args.blurHandler).toHaveBeenCalled();
	expect(res.args.focusHandler).toHaveBeenCalled();
};

export const disabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input.disabled).toBe(true);
};

export const multiline = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input).toBeVisible();
	expect(input).not.toHaveFocus();
	userEvent.type(
		input,
		`Hello World
    Hello World`
	);
	expect(input).toHaveFocus();
	expect(input.value).toBe(`Hello World
    Hello World`);
};

export const placeholder = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input.placeholder).toBe('Readonly');
};
