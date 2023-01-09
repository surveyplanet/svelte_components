import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../../lib/Button.svelte';
import { BUTTON_SIZES } from '../../lib/_definitions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import basicMeta from './Basic.stories';

const meta: Meta<Button> = {
	title: 'Button/Icons',
	...basicMeta,
};

export default meta;
type Story = StoryObj<Button>;

export const Large: Story = {
	args: {
		label: 'Large',
		icon: 'add',
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
		icon: 'add',
		size: BUTTON_SIZES.SMALL,
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const btn = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
		expect(btn.innerText).toBe('Small');
		expect(btn.offsetHeight).toBe(24);
	},
};

export const ActionButton: Story = {
	args: {
		label: '',
		icon: 'search',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Button,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const btn = canvas.getByRole('button');
		const style = window.getComputedStyle(btn);

		await userEvent.click(btn);

		expect(btn).toBeVisible();

		expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
		expect(btn.innerText).toBe('');
		expect(btn.offsetHeight).toBe(24);
	},
};
