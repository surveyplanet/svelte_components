// import type { PlayFunctionContext } from '@storybook/types';
import type { Meta, StoryObj } from '@storybook/svelte';
import Button from '../../lib/Button.svelte';
import { BUTTON_SIZES } from '../../lib/_definitions';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import basicMeta from './Basic.stories';

const meta: Meta<Button> = {
	title: 'Button/Size',
	...basicMeta,
};

export default meta;
type Story = StoryObj<Button>;

export const Large: Story = {
	args: {
		label: 'Large',
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

		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		expect(btn.innerText).toBe('Large');
		expect(btn.offsetHeight).toBe(48);
	},
};

export const Medium: Story = {
	args: {
		label: 'Medium',
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

		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		expect(btn.innerText).toBe('Medium');
		expect(btn.offsetHeight).toBe(40);
	},
};

export const Small: Story = {
	args: {
		label: 'Small',
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

		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
		expect(btn.innerText).toBe('Small');
		expect(btn.offsetHeight).toBe(24);
	},
};
