import type { Meta, StoryObj } from '@storybook/svelte';
import argTypes from './default_metadata';
import Button from '../../lib/Button.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<Button> = {
	title: 'Button/Loader',
	component: Button,
	argTypes,
};

export default meta;
type Story = StoryObj<Button>;

export const LoaderDefault: Story = {
	args: {
		label: 'Loader',
		disabled: true,
		loader: true,
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
		const afterEl = window.getComputedStyle(btn, ':after');
		await userEvent.click(btn);

		expect(btn).toBeVisible();

		await expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		await expect(btn.innerText).toBe('');
		await expect(btn).toHaveClass('loader');
		await expect(afterEl.animationDuration).toBe('1s');
		await expect(afterEl.animationTimingFunction).toBe('linear');
		await expect(afterEl.animationIterationCount).toBe('infinite');
	},
};
export const LoaderSecondaryLarge: Story = {
	args: {
		label: 'Loader',
		disabled: true,
		loader: true,
		size: 'large',
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
		await expect(btn.innerText).toBe('Default');
		await expect(btn).toHaveClass('loader');
	},
};
export const DefaultSmall: Story = {
	args: {
		label: 'Default',
		disabled: true,
		loader: true,
		size: 'small',
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
		await expect(btn.innerText).toBe('Default');
		await expect(btn).toHaveClass('loader');
	},
};

export const Primary: Story = {
	args: {
		label: 'Primary',
		mode: 'primary',
		disabled: true,
		loader: true,
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

		await expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
		await expect(btn.innerText).toBe('');
		await expect(btn).toHaveClass('loader');
	},
};
export const LoaderTertiarySmall: Story = {
	args: {
		label: 'Loader',
		disabled: true,
		loader: true,
		size: 'small',
		mode: 'tertiary',
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

		await expect(style.backgroundColor).toBe('rgb(161, 253, 165)');
		await expect(btn.innerText).toBe('');
		await expect(btn).toHaveClass('loader');
	},
};
export const LoaderWithIcon: Story = {
	args: {
		label: 'Loader',
		disabled: true,
		loader: true,
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

		await expect(btn.innerText).toBe('');
		await expect(btn).toHaveClass('loader');
	},
};

export const LoaderRounded: Story = {
	args: {
		label: 'Loader',
		disabled: true,
		loader: true,
		round: true,
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

		await expect(btn.innerText).toBe('');
		await expect(btn).toHaveClass('loader');
	},
};
