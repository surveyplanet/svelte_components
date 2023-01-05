import type { Meta, StoryObj } from '@storybook/svelte';

import Breadcrumbs from '../../lib/Breadcrumbs.svelte';
import Documentation from './breadcrumbs.mdx';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Breadcrumbs> = {
	title: 'Breadcrumbs/Default',
	component: Breadcrumbs,
	parameters: {
		docs: {
			page: Documentation,
		},
	},
	argTypes: [
		{
			name: 'name',
			url: 'https://www.google.com',
		},
	],
};

export default meta;

type Story = StoryObj<Breadcrumbs>;

export const Basic: Story = {
	render: (args: StoryObj) => {
		return {
			Component: Breadcrumbs,
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
