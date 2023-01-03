// import type { PlayFunctionContext } from '@storybook/types';
import type { Meta, StoryObj } from '@storybook/svelte';
import argTypes from './default_metadata';
import Button from '../../lib/Button.svelte';
import { BUTTON_SIZES } from '../../lib/_definitions';
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
		size: BUTTON_SIZES.LARGE,
		icon: 'surveys',
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

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
		expect(btn.innerText).toBe('Large');
		expect(btn.offsetHeight).toBe(48);
	},
};

export const Medium: Story = {
	args: {
		label: 'Medium',
		icon: 'surveys',
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

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
		expect(btn.innerText).toBe('Medium');
		expect(btn.offsetHeight).toBe(32);
	},
};

export const Small: Story = {
	args: {
		label: 'Small',
		size: BUTTON_SIZES.SMALL,
		icon: 'surveys',
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

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
		expect(btn.innerText).toBe('Small');
		expect(btn.offsetHeight).toBe(24);
	},
};

export const Labless: Story = {
	args: {
		label: '',
		size: BUTTON_SIZES.SMALL,
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

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
		expect(btn.innerText).toBe('');
		expect(btn.offsetHeight).toBe(24);
	},
};
