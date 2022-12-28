import type { Meta, StoryObj } from '@storybook/svelte';

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
};
