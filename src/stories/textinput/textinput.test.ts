import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const basic = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	const label: HTMLLabelElement = canvas.getByText('Label');

	expect(input).toBeVisible();
	expect(input).toBeDefined();

	expect(input).not.toBeDisabled();
	expect(input).toHaveClass(' sp-text-input');
	expect(input.id).toBe('text-input-id');
	expect(input.placeholder).toBe('Placeholder');
	expect(input.readOnly).toBe(false);
	expect(label).toHaveClass(' sp-text-input--label--text');

	expect(input.getAttribute('data-test')).toBe('test');
	expect(input.getAttribute('data-test2')).toBe('test2');

	userEvent.type(input, 'Hello World');
	expect(input).toHaveFocus();
	expect(input.value).toBe(`Hello World`);

	userEvent.click(document.body);
	expect(input).not.toHaveFocus();

	expect(res.args.changeHandler).toHaveBeenCalled();
	expect(res.args.keyupHandler).toHaveBeenCalled();
	expect(res.args.keydownHandler).toHaveBeenCalled();
	expect(res.args.blurHandler).toHaveBeenCalled();
	expect(res.args.focusHandler).toHaveBeenCalled();
};

export const multiline = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	const value = ['Line one', 'Line two', 'Line three'].join('\n');
	const label: HTMLLabelElement = canvas.getByText('Label');

	expect(input).toBeVisible();
	expect(input).not.toHaveFocus();

	expect(input).not.toBeDisabled();
	expect(input).toHaveClass(' sp-text-input');
	expect(input.id).toBe('text-input-id');
	expect(input.placeholder).toBe('Placeholder');
	expect(input.readOnly).toBe(false);
	expect(label).toHaveClass(' sp-text-input--label--text');

	expect(input.getAttribute('data-test')).toBe('test');
	expect(input.getAttribute('data-test2')).toBe('test2');

	userEvent.type(input, value);
	expect(input).toHaveFocus();
	userEvent.click(document.body);
	expect(input).not.toHaveFocus();
	expect(input.value).toBe(value);

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

export const readonly = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input.readOnly).toBe(true);
};

export const noLabel = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input).not.toHaveClass(' sp-text-input--label--text');
};
