import type { Meta, StoryObj } from '@storybook/svelte';
// import argTypes from './default_metadata';
import Button from '../../lib/Button.svelte';
import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './button.mdx';

const meta: Meta<Button> = {
	title: 'Button/Basic',
	argTypes: {
		label: { control: 'text' },
		disabled: { control: 'boolean', defaultValue: false },
		loader: { control: 'boolean', defaultValue: false },
		round: { control: 'boolean', defaultValue: false },
		block: { control: 'boolean', defaultValue: false },
		mode: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'tertiary', 'quaternary', 'dark'],
		},
		size: {
			control: { type: 'select' },
			options: ['small', 'medium', 'large'],
			defaultValue: BUTTON_SIZES.MEDIUM,
		},
		icon: {
			control: { type: 'select' },
			options: ['add', 'search', 'delete', 'close', 'menu'],
		},
	},
	component: Button,
	parameters: {
		docs: {
			page: Documentation,
		},
	},
};

export default meta;
type Story = StoryObj<Button>;

export const Primary: Story = {
	args: {
		label: 'Button',
		mode: BUTTON_MODES.PRIMARY,
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

		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		expect(btn.innerText).toBe('Button');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Secondary: Story = {
	args: {
		label: 'Secondary',
		mode: BUTTON_MODES.SECONDARY,
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

		expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
		expect(btn.innerText).toBe('Secondary');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Tertiary: Story = {
	args: {
		label: 'Tertiary',
		mode: BUTTON_MODES.TERTIARY,
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

		expect(style.backgroundColor).toBe('rgb(161, 253, 165)');
		expect(btn.innerText).toBe('Tertiary');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Quaternary: Story = {
	args: {
		label: 'Quaternary',
		mode: BUTTON_MODES.QUATERNARY,
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

		expect(style.backgroundColor).toBe('rgb(158, 228, 250)');
		expect(btn.innerText).toBe('Quaternary');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};
export const Dark: Story = {
	args: {
		label: 'Dark Button',
		mode: BUTTON_MODES.DARK,
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

		expect(style.backgroundColor).toBe('rgb(38, 43, 53)');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};
export const Light: Story = {
	args: {
		label: 'Light Button',
		mode: BUTTON_MODES.LIGHT,
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
		expect(btn.innerText).toBe('Light Button');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Rounded: Story = {
	args: {
		label: 'Go Pro',
		round: true,
		mode: BUTTON_MODES.SECONDARY,
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

		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		expect(btn.innerText).toBe('Go Pro');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Block: Story = {
	args: {
		label: 'Button should take up all available horizontal space.',
		block: true,
		size: BUTTON_SIZES.LARGE,
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
		// console.log(global.document.body.style.padding); // there is no padding
		expect(btn).toBeVisible();
		const paddingSize = 35; // padding is approximately 35px
		expect(btn.offsetWidth).toBeGreaterThan(
			global.innerWidth - paddingSize
		);
	},
};
