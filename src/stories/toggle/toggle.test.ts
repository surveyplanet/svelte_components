import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const basic = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLDivElement = canvas.getByRole('switch');
	const track: HTMLDivElement = toggle.querySelector('.sp-toggle--track');
	const checkbox: HTMLInputElement = toggle.querySelector(
		'input[type=checkbox]'
	);
	expect(checkbox).not.toBeVisible();
	expect(checkbox.disabled).toBe(false);
	expect(toggle).toHaveClass('sp-toggle--off');
	expect(toggle).toHaveAttribute('aria-checked', 'false');
	expect(checkbox).not.toHaveFocus();
	await userEvent.click(checkbox);
	expect(toggle).toHaveClass('sp-toggle--on');
	expect(toggle).toHaveAttribute('aria-checked', 'true');
	expect(checkbox).toHaveFocus();
	expect(res.args.changeHandler).toHaveBeenCalled();
};

export const disabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLInputElement = canvas.getByRole('checkbox');
	expect(toggle.disabled).toBe(true);
};

export const tall = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLInputElement = canvas.getByRole('switch');
	expect(toggle).toHaveClass('sp-toggle--tall');
};
