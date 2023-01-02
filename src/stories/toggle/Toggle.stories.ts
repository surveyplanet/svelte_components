import type { Meta, StoryObj } from '@storybook/svelte';
import Toggle from '../../lib/Toggle.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './documentation.mdx';

const meta: Meta<Toggle> = {
	title: 'Toggle/Default',
	component: Toggle,
	argTypes: {
		disabled: { control: 'boolean' },
		checked: { control: 'boolean' },
	},
	parameters: {
		docs: {
			page: Documentation,
		},
	},
};

export default meta;
type Story = StoryObj<Toggle>;

export const Default: Story = {
	args: {},
	render: (args) => {
		return {
			Component: Toggle,
			props: args,
		};
	},
	play: async (res) => {
		const canvas = within(res.canvasElement);

		const toggle: HTMLInputElement = canvas.getByRole('checkbox');
		const style = window.getComputedStyle(toggle);
		const color = 'rgb(181, 152, 255)';
		await userEvent.click(toggle);

		await expect(toggle).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(toggle).toHaveFocus();
		await expect(toggle.disabled).toBe(false);
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	render: (args) => {
		return {
			Component: Toggle,
			props: args,
		};
	},
	play: async (res) => {
		const canvas = within(res.canvasElement);

		const toggle: HTMLInputElement = canvas.getByRole('checkbox');
		const style = window.getComputedStyle(toggle);
		const color = 'rgb(181, 152, 255)';
		await userEvent.click(toggle);

		await expect(toggle).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(toggle).toHaveFocus();
		await expect(toggle.disabled).toBe(true);
	},
};
