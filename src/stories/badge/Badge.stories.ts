import type { Meta, StoryObj } from '@storybook/svelte';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Badge from '../../lib/Badge.svelte';
import Documentation from './badge.mdx';

const meta: Meta<Badge> = {
	title: 'Badge/Default',
	argTypes: {
		label: { control: 'text' },
		color: { control: { type: 'color' } },
		labelColor: { control: { type: 'color' } },
	},
	parameters: {
		docs: {
			page: Documentation,
		},
	},
};

export default meta;
type Story = StoryObj<Badge>;

export const Primary: Story = {
	args: {
		label: 'PRO',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Badge,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const badge = canvas.getByText('PRO');

		const style = window.getComputedStyle(badge);
		const color = style.getPropertyValue('background-color');
		const labelColor = style.getPropertyValue('color');
		const textTransform = style.getPropertyValue('text-transform');

		expect(badge).toBeTruthy();
		expect(badge).toHaveClass('sp-badge');
		expect(color).toBe('rgb(255, 233, 120)');
		expect(labelColor).toBe('rgb(38, 43, 53)');
		expect(textTransform).toBe('uppercase');
	},
};

export const Inverted: Story = {
	args: {
		label: 'Inverted',
		color: 'black',
		labelColor: 'white',
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Badge,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const badge = canvas.getByText('Inverted');

		const style = window.getComputedStyle(badge);
		const color = style.getPropertyValue('background-color');
		const labelColor = style.getPropertyValue('color');

		expect(badge).toBeTruthy();
		expect(badge).toHaveClass('sp-badge');
		expect(color).toBe('rgb(0, 0, 0)');
		expect(labelColor).toBe('rgb(255, 255, 255)');
	},
};
