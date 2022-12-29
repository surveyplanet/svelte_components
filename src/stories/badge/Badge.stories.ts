import type { Meta, StoryObj } from '@storybook/svelte';
import { within, userEvent, getByTestId } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Badge from '../../lib/Badge.svelte';
import Documentation from './documentation.mdx';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Badge> = {
	title: 'Badge/Default',
	arg: {
		label: 'Badge',
		color: 'primary',
		size: 'medium',
	},

	component: Badge,
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
		size: 'medium',
	},
	render: (args: StoryObj) => {
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
		expect(badge).toHaveClass('sp-badge--medium');
		expect(color).toBe('rgb(255, 233, 120)');
	},
};

export const Secondary: Story = {
	args: {
		label: 'PRO',
		color: 'secondary',
		size: 'medium',
	},
	render: (args: StoryObj) => {
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
		expect(badge).toHaveClass('sp-badge--medium');
		expect(color).toBe('rgb(161, 133, 231)');
	},
};

export const Success: Story = {
	args: {
		label: 'PRO',
		color: 'success',
		size: 'medium',
	},
	render: (args: StoryObj) => {
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
		expect(badge).toHaveClass('sp-badge--success');
		expect(badge).toHaveClass('sp-badge--medium');

		expect(color).toBe('rgb(161, 253, 165)');
	},
};

export const Danger: Story = {
	args: {
		label: 'PRO',
		color: 'danger',
		size: 'small',
	},
	render: (args: StoryObj) => {
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
		expect(badge).toHaveClass('sp-badge--small');
		expect(color).toBe('rgb(255, 138, 138)');
	},
};

export const Warning: Story = {
	args: {
		label: 'PRO',
		color: 'warning',
		size: 'large',
	},
	render: (args: StoryObj) => {
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
		expect(badge).toHaveClass('sp-badge--warning');
		expect(badge).toHaveClass('sp-badge--large');
		expect(color).toBe('rgb(255, 233, 120)');
		expect(badge).toHaveStyle('font-size: 28px');
		// expect(badge).toHaveStyle('width: 80px');
	},
};
