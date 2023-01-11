import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const basic = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLInputElement = canvas.getByRole('checkbox');
	await userEvent.click(toggle);
	expect(toggle.disabled).toBe(false);
};

export const disabled = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLInputElement = canvas.getByRole('checkbox');
	expect(toggle.disabled).toBe(true);
};

export const tall = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);
	const toggle: HTMLInputElement = canvas.getByRole('checkbox');
	await userEvent.click(toggle);
	expect(toggle.disabled).toBe(false);
};
