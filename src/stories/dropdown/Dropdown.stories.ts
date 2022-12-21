import type { Meta, StoryObj } from '@storybook/svelte';

import Dropdown from '../../lib/Dropdown.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './documentation.mdx';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Dropdown> = {
	title: 'Dropdown/Default',
	component: Dropdown,
	parameters: {
		// docs: {
		// 	page: Documentation,
		// },
	},
	argTypes: [
		{
			label: { control: 'text' },
			clickHandler: { action: 'SurveyPlanetButtonClickEvent' },
			disabled: { control: 'boolean' },
			loader: { control: 'boolean' },
			mode: {
				control: { type: 'select' },
				options: ['primary', 'secondary', 'tertiary'],
			},
			size: {
				control: { type: 'select' },
				options: ['small', 'medium', 'large'],
			},
		},
	],
	dropdownLabel: { type: 'array' },
};
export default meta;

type Story = StoryObj<Dropdown>;

export const Default: Story = {
	args: {
		options: [
			{
				label: 'Dropdown',
				mode: 'primary',
				dropdownLabels: [
					{ label: '1st label' },
					{ label: '2nd label' },
					{ label: '3rd label' },
				],
			},
		],
	},
	render: (args) => {
		return {
			Component: Dropdown,
			props: args,
		};
	},
	// play: async ({ canvasElement }) => {
	// 	const canvas = within(canvasElement);

	// 	const btn1: HTMLButtonElement = canvas.getByText('1st label');
	// 	const style = window.getComputedStyle(btn1);
	// 	const color = 'rgb(255, 233, 120)';

	// 	await userEvent.click(btn1);

	// 	await expect(btn1).toBeVisible();

	// 	await expect(style.backgroundColor).toBe(color);
	// 	await expect(btn1).toHaveFocus();
	// 	await expect(btn1.disabled).toBe(false);
	// },
};
