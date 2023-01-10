import type { Meta, StoryObj } from '@storybook/svelte';

import Icon from '../../lib/Icon.svelte';
import Documentation from './icon.mdx';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
			control: { type: 'number', min: 4, max: 512, step: 4 },
			// options: ['small', 'medium', 'large'],
		},
		color: { control: 'color' },
		debug: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<Icon>;

export const Basic: Story = {
	args: {
		name: 'search',
	},
	render: (args: StoryObj) => {
		return {
			Component: Icon,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const icon: HTMLElement = canvas.getByTitle('icon search');

		// Can't get size of icon for some reason.
		// const dimensions: DOMRect = icon.getBoundingClientRect();
		// console.log('dimensions:', dimensions);

		expect(icon).toBeVisible();
		expect(icon).toBeTruthy();
		// expect(icon.offsetHeight).toBe(48);
	},
};

export const Light: Story = {
	args: {
		name: 'search',
		color: 'white',
	},
	parameters: {
		backgrounds: {
			default: 'darkest',
		},
	},
	render: <T extends object>(args: T) => {
		return {
			Component: Icon,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const icon: HTMLElement = canvas.getByTitle('icon search');

		expect(icon).toBeVisible();
		expect(icon).toBeTruthy();
		// expect(icon.getAttribute('width')).toBe(48);
	},
};
