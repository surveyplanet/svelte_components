import type { Meta, StoryObj } from '@storybook/svelte';
import argTypes from './default_metadata';
import Button from '../../lib/Button.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './documentation.mdx';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Button> = {
	title: 'Button/Default',
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
		mode: 'primary',
		label: 'Primary button',
	},
	render: (args) => {
		return {
			Component: Button,
			props: args,
		};
	},
};

export const Secondary: Story = {
	args: {
		label: 'Secondary button',
	},
	render: (args) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);
		const color = 'rgb(181, 152, 255)';
		await userEvent.click(btn);

		await expect(btn).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn.innerText).toBe('Secondary button');
		await expect(btn).toHaveFocus();
		await expect(btn.disabled).toBe(false);
	},
};

export const Tertiary: Story = {
	args: {
		mode: 'tertiary',
		label: 'Tertiary button',
	},
	render: (args) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);
		const color = 'rgb(161, 253, 165)';
		await userEvent.click(btn);

		await expect(btn).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn.innerText).toBe('Tertiary button');
		await expect(btn).toHaveFocus();
		await expect(btn.disabled).toBe(false);
	},
};

export const Disabled: Story = {
	args: {
		label: 'Disabled',
		disabled: true,
	},
	render: (args) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn: HTMLButtonElement = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);
		const color = 'rgb(211, 211, 211)';
		await userEvent.click(btn);

		await expect(btn).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn.innerText).toBe('Disabled');
		await expect(btn).not.toHaveFocus();
		await expect(btn.disabled).toBe(true);
	},
};
