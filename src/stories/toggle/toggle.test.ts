import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const basic = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLInputElement = canvas.getByRole('checkbox');
	expect(toggle.disabled).toBe(false);
	await userEvent.click(toggle);
	expect(res.args.changeHandler).toHaveBeenCalled();
};

export const disabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLInputElement = canvas.getByRole('checkbox');
	expect(toggle.disabled).toBe(true);
};

export const tall = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLInputElement = canvas.getByRole('checkbox');
	await userEvent.click(toggle);
	expect(toggle.disabled).toBe(false);
};
