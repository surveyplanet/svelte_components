import type { Meta, StoryObj } from '@storybook/svelte';
import argTypes from './default_metadata';
import Button from '../../lib/Button.svelte';
import { BUTTON_MODES } from '../../lib/_definitions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './button.mdx';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Button> = {
	title: 'Button/Basic',
	argTypes,
	component: Button,
	parameters: {
		docs: {
			page: Documentation,
		},
	},
};

export default meta;
type Story = StoryObj<Button>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
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
		const color = 'rgb(181, 152, 255)';

		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe(color);
		expect(btn.innerText).toBe('Button');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Secondary: Story = {
	args: {
		mode: BUTTON_MODES.SECONDARY,
		label: 'Secondary',
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
		const color = 'rgb(255, 233, 120)';
		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe(color);
		expect(btn.innerText).toBe('Secondary');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Tertiary: Story = {
	args: {
		mode: 'tertiary',
		label: 'Tertiary',
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
		const color = 'rgb(161, 253, 165)';
		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe(color);
		expect(btn.innerText).toBe('Tertiary');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Rounded: Story = {
	args: {
		label: 'Rounded',
		round: true,
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
		const color = 'rgb(255, 233, 120)';
		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe(color);
		expect(btn.innerText).toBe('Rounded');
		expect(btn).toHaveFocus();
		expect(btn.disabled).toBe(false);
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		disabled: true,
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
		const color = 'rgb(237, 226, 255)';
		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe(color);
		expect(btn.innerText).toBe('Disabled');
		expect(btn).not.toHaveFocus();
		expect(btn.disabled).toBe(true);
	},
};
