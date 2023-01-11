import type { Meta, StoryObj } from '@storybook/svelte';
// import argTypes from './default_metadata';
import Button from '../../lib/Button.svelte';
import { BUTTON_MODES } from '../../lib/_definitions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import basicMeta from './Basic.stories';

const meta: Meta<Button> = {
	title: 'Button/Disabled',
	argTypes: {
		disabled: { control: 'boolean', defaultValue: true },
	},
	...basicMeta,
};

export default meta;
type Story = StoryObj<Button>;

export const Default: Story = {
	args: {
		label: 'Disabled Button',
		disabled: true,
		icon: 'add',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(236, 229, 255)');
		expect(style.color).toBe('rgb(219, 204, 255)');
		expect(btn).not.toHaveFocus();
		expect(btn.disabled).toBe(true);
	},
};

export const Secondary: Story = {
	args: {
		label: 'Disabled Button',
		mode: BUTTON_MODES.SECONDARY,
		disabled: true,
		icon: 'add',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(255, 245, 188)');
		expect(style.color).toBe('rgb(250, 199, 102)');
		expect(btn).not.toHaveFocus();
		expect(btn.disabled).toBe(true);
	},
};

export const Tertiary: Story = {
	args: {
		label: 'Disabled Button',
		mode: BUTTON_MODES.TERTIARY,
		disabled: true,
		icon: 'add',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(217, 254, 219)');
		expect(style.color).toBe('rgb(123, 228, 146)');
		expect(btn).not.toHaveFocus();
		expect(btn.disabled).toBe(true);
	},
};

export const Quaternary: Story = {
	args: {
		label: 'Disabled Button',
		mode: BUTTON_MODES.QUATERNARY,
		disabled: true,
		icon: 'add',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(216, 244, 253)');
		expect(style.color).toBe('rgb(120, 196, 238)');
		expect(btn).not.toHaveFocus();
		expect(btn.disabled).toBe(true);
	},
};
export const Dark: Story = {
	args: {
		label: 'Disabled Button',
		mode: BUTTON_MODES.DARK,
		disabled: true,
		icon: 'add',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(220, 222, 225)');
		expect(style.color).toBe('rgb(115, 122, 135)');
		expect(btn).not.toHaveFocus();
		expect(btn.disabled).toBe(true);
	},
};

export const Light: Story = {
	args: {
		label: 'Disabled Button',
		mode: BUTTON_MODES.LIGHT,
		disabled: true,
		icon: 'add',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		expect(btn).toBeVisible();
		expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
		expect(style.color).toBe('rgb(220, 222, 225)');
		expect(btn).not.toHaveFocus();
		expect(btn.disabled).toBe(true);
	},
};
