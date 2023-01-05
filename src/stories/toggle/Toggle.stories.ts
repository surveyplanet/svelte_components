import type { Meta, StoryObj } from '@storybook/svelte';
import Toggle from '../../lib/Toggle.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './toggle.mdx';

const meta: Meta<Toggle> = {
	title: 'Toggle/Default',
	component: Toggle,
	argTypes: {
		on: { control: 'boolean', defaultValue: false },
		disabled: { control: 'boolean', defaultValue: false },
		tall: { control: 'boolean', defaultValue: false },
		// onTrackColor: { control: 'color', defaultValue: '#262b35' },
		// onKnobColor: { control: 'color', defaultValue: '#f7f8f7' },
		// offTrackColor: { control: 'color', defaultValue: '#ede2ff' },
		// offKnobColor: { control: 'color', defaultValue: '#f7f8f7' },
		// disabledTrackColor: { control: 'color', defaultValue: '#67748e' },
		// disabledKnobColor: { control: 'color', defaultValue: '#f7f8f7' },
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
	render: <T extends object>(args: T) => {
		return {
			Component: Toggle,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const toggle: HTMLInputElement = canvas.getByRole('checkbox');
		await userEvent.click(toggle);

		expect(toggle.disabled).toBe(false);
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Toggle,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const toggle: HTMLInputElement = canvas.getByRole('checkbox');

		expect(toggle.disabled).toBe(true);
	},
};
