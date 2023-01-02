import type { Meta, StoryObj } from '@storybook/svelte';

import Icon from '../../lib/Icon.svelte';
import Documentation from './icon.mdx';
import { within } from '@storybook/testing-library';
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
	// play: async (res) => {
	// 	const canvas = within(res.canvasElement);

	// 	const btn: HTMLButtonElement = canvas.getByRole('button');
	// 	const style = window.getComputedStyle(btn);
	// 	const color = 'rgb(255, 233, 120)';

	// 	const promise = userEvent.click(btn);
	// 	console.log(promise);

	// 	await promise;

	// 	await expect(btn).toBeVisible();

	// 	await expect(style.backgroundColor).toBe(color);
	// 	await expect(btn.innerText).toBe('Primary button');
	// 	await expect(btn).toHaveFocus();
	// 	await expect(btn.disabled).toBe(false);
	// },
};

export const Light: Story = {
	args: {
		name: 'search',
		color: 'white',
	},
	render: (args) => {
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
