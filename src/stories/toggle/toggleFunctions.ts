import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const defaultToggle = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);
	const toggle = canvas.getByRole('checkbox');
	await userEvent.click(toggle);
	expect(toggle.disabled).toBe(false);
};
export const disabled = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);
	const toggle = canvas.getByRole('checkbox');
	expect(toggle.disabled).toBe(true);
};
export const tall = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);
	const toggle = canvas.getByRole('checkbox');
	await userEvent.click(toggle);
	expect(toggle.disabled).toBe(false);
};

export const render = {
	render: (args) => {
		return {
			Component: Toggle,
			props: args,
		};
	},
};
