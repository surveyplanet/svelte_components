import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { delay } from '../../lib/_utils';

export const basic = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input).toBeVisible();
	expect(input.disabled).toBe(false);
	expect(input).not.toHaveFocus();
	await userEvent.type(input, 'Hello World');
	await userEvent.keyboard('[enter]');
	expect(input).toHaveFocus();
	expect(res.args.changeHandler).toHaveBeenCalled();
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
	expect(input.disabled).toBe(false);
	expect(input).not.toHaveFocus();
	await userEvent.type(input, 'Hello World');
	expect(input).toHaveFocus();
	expect(input.value).toBe(`Hello World`);
};

export const placeholder = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const input: HTMLInputElement = canvas.getByRole('textbox');
	expect(input.placeholder).toBe('Readonly');
};
