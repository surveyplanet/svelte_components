// import type { PlayFunctionContext } from '@storybook/types';
import type { Meta, StoryObj } from '@storybook/svelte';
import argTypes from './default_metadata';
import Button from '../../lib/Button.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Button> = {
	title: 'Button/Icons',
	component: Button,
	argTypes,
};

export default meta;
type Story = StoryObj<Button>;

export const Large: Story = {
	args: {
		label: 'Large',
		size: 'large',
		icon: 'search',
	},
	render: (args: StoryObj) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		await expect(btn).toBeVisible();

		await expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		await expect(btn.innerText).toBe('Large');
		await expect(btn.offsetHeight).toBe(44);
	},
};

export const Medium: Story = {
	args: {
		label: 'Medium',
		icon: 'search',
	},
	render: (args: StoryObj) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		await expect(btn).toBeVisible();

		await expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		await expect(btn.innerText).toBe('Medium');
		await expect(btn.offsetHeight).toBe(35);
	},
};

export const Small: Story = {
	args: {
		label: 'Small',
		size: 'small',
		icon: 'search',
	},
	render: (args) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		await expect(btn).toBeVisible();

		await expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		await expect(btn.innerText).toBe('Small');
		await expect(btn.offsetHeight).toBe(26);
	},
};
