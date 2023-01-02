import type { Meta, StoryObj } from '@storybook/svelte';
import { within, userEvent, getByTestId } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Badge from '../../lib/Badge.svelte';
import Documentation from './documentation.mdx';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Badge> = {
	title: 'Badge/Default',
	argTypes: {
		label: { control: 'text' },
		color: {
			control: { type: 'select' },
			options: ['primary', 'secondary', 'tertiary', 'success', 'danger'],
		},
	},
	parameters: {
		docs: {
			page: Documentation,
		},
	},
};

export default meta;
type Story = StoryObj<Badge>;

// More on writing stories with args: https://storybook.js.org/docs/7.0/svelte/writing-stories/args
export const Primary: Story = {
	args: {
		label: 'PRO',
		color: 'primary',
	},
	render: (args) => {
		return {
			Component: Badge,
			props: args,
		};
	},
	play: async (res) => {
		const canvas = within(res.canvasElement);

		const badge = canvas.getByText('PRO');

		const style = window.getComputedStyle(badge);
		const color = style.getPropertyValue('background-color');

		expect(badge).toBeTruthy();
		expect(badge).toHaveTextContent('PRO');
		expect(badge).toHaveClass('sp-badge');
		expect(badge).toHaveClass('sp-badge--primary');
		expect(color).toBe('rgb(255, 233, 120)');
	},
};

export const Secondary: Story = {
	args: {
		label: 'PRO',
		color: 'secondary',
	},
	render: (args) => {
		return {
			Component: Badge,
			props: args,
		};
	},
	play: async (res) => {
		const canvas = within(res.canvasElement);

		const badge = canvas.getByText('PRO');

		const style = window.getComputedStyle(badge);
		const color = style.getPropertyValue('background-color');

		expect(badge).toBeTruthy();
		expect(badge).toHaveTextContent('PRO');
		expect(badge).toHaveClass('sp-badge');
		expect(badge).toHaveClass('sp-badge--secondary');
		expect(color).toBe('rgb(161, 133, 231)');
	},
};

export const Tertiary: Story = {
	args: {
		label: 'PRO',
		color: 'tertiary',
	},
	render: (args) => {
		return {
			Component: Badge,
			props: args,
		};
	},
	play: async (res) => {
		const canvas = within(res.canvasElement);

		const badge = canvas.getByText('PRO');
		const style = window.getComputedStyle(badge);
		const color = style.getPropertyValue('background-color');

		expect(badge).toBeTruthy();
		expect(badge).toHaveTextContent('PRO');
		expect(badge).toHaveClass('sp-badge');
		expect(badge).toHaveClass('sp-badge--tertiary');
		expect(color).toBe('rgb(161, 253, 165)');
	},
};

export const Danger: Story = {
	args: {
		label: 'PRO',
		color: 'danger',
	},
	render: (args) => {
		return {
			Component: Badge,
			props: args,
		};
	},
	play: async (res) => {
		const canvas = within(res.canvasElement);

		const badge = canvas.getByText('PRO');

		const style = window.getComputedStyle(badge);
		const color = style.getPropertyValue('background-color');

		expect(badge).toBeTruthy();
		expect(badge).toHaveTextContent('PRO');
		expect(badge).toHaveClass('sp-badge');
		expect(badge).toHaveClass('sp-badge--danger');
		expect(color).toBe('rgb(234, 131, 197)');
	},
};
