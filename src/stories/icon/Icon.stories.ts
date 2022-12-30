import type { Meta, StoryObj } from '@storybook/svelte';

import Icon from '../../lib/Icon.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './documentation.mdx';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Icon> = {
	title: 'Icon/Default',
	component: Icon,
	parameters: {
		docs: {
			page: Documentation,
		},
	},
	argTypes: {
		name: { control: 'text' },
		size: {
			control: { type: 'number' },
			// options: ['small', 'medium', 'large'],
		},
		color: { control: 'color' },
		debug: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<Icon>;

export const Primary: Story = {
	args: {
		name: 'search',
		color: 'white',
	},
	render: (args: StoryObj) => {
		return {
			Component: Icon,
			props: args,
		};
	},
	play: async (res) => {
		const canvas = within(res.canvasElement);

		const icon = canvas.getByTitle('icon search');

		expect(icon).toBeVisible();
		expect(icon).toBeTruthy();
	},
};
