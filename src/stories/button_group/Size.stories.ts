import type { Meta, StoryObj } from '@storybook/svelte';

import ButtonGroup from '../../lib/ButtonGroup.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './documentation.mdx';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<ButtonGroup> = {
	title: 'Button Group/Size',
	component: ButtonGroup,
	parameters: {
		docs: {
			page: Documentation,
		},
	},
	argTypes: {
		options: [
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
		vertical: { control: 'boolean' },
	},
};

export default meta;

type Story = StoryObj<ButtonGroup>;

export const Small: Story = {
	args: {
		options: [
			{
				label: '1st label',
				size: 'small',
			},
			{
				label: '2nd label',
				size: 'small',
			},
			{
				label: '3rd label',
				size: 'small',
			},
		],
		vertical: false,
	},

	render: (args) => {
		return {
			Component: ButtonGroup,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn1: HTMLButtonElement = canvas.getByText('1st label');
		const btn2: HTMLButtonElement = canvas.getByText('2nd label');
		const btn3: HTMLButtonElement = canvas.getByText('3rd label');
		const style = window.getComputedStyle(btn1);
		const color = 'rgb(255, 233, 120)';

		await userEvent.click(btn1);

		await expect(btn1).toBeVisible();
		await expect(btn2).toBeVisible();
		await expect(btn3).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn1).toHaveFocus();
		await expect(btn1.disabled).toBe(false);
	},
};
export const Small_Vertical: Story = {
	args: {
		options: [
			{
				label: '1st label',
				size: 'small',
			},
			{
				label: '2nd label',
				size: 'small',
			},
			{
				label: '3rd label',
				size: 'small',
			},
		],
		vertical: true,
	},

	render: (args) => {
		return {
			Component: ButtonGroup,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn1: HTMLButtonElement = canvas.getByText('1st label');
		const btn2: HTMLButtonElement = canvas.getByText('2nd label');
		const btn3: HTMLButtonElement = canvas.getByText('3rd label');
		const style = window.getComputedStyle(btn1);
		const color = 'rgb(255, 233, 120)';

		await userEvent.click(btn1);

		await expect(btn1).toBeVisible();
		await expect(btn2).toBeVisible();
		await expect(btn3).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn1).toHaveFocus();
		await expect(btn1.disabled).toBe(false);
	},
};

export const Medium: Story = {
	args: {
		options: [
			{
				label: '1st label',
				size: 'medium',
			},
			{
				label: '2nd label',
				size: 'medium',
			},
			{
				label: '3rd label',
				size: 'medium',
			},
		],
		vertical: false,
	},

	render: (args) => {
		return {
			Component: ButtonGroup,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn1: HTMLButtonElement = canvas.getByText('1st label');
		const btn2: HTMLButtonElement = canvas.getByText('2nd label');
		const btn3: HTMLButtonElement = canvas.getByText('3rd label');
		const style = window.getComputedStyle(btn1);
		const color = 'rgb(181, 152, 255)';

		await userEvent.click(btn1);

		await expect(btn1).toBeVisible();
		await expect(btn2).toBeVisible();
		await expect(btn3).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn1).toHaveFocus();
		await expect(btn1.disabled).toBe(false);
	},
};

export const Medium_Vertical: Story = {
	args: {
		options: [
			{
				label: '1st label',
				size: 'medium',
			},
			{
				label: '2nd label',
				size: 'medium',
			},
			{
				label: '3rd label',
				size: 'medium',
			},
		],
		vertical: true,
	},

	render: (args) => {
		return {
			Component: ButtonGroup,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn1: HTMLButtonElement = canvas.getByText('1st label');
		const btn2: HTMLButtonElement = canvas.getByText('2nd label');
		const btn3: HTMLButtonElement = canvas.getByText('3rd label');
		const style = window.getComputedStyle(btn1);
		const color = 'rgb(181, 152, 255)';

		await userEvent.click(btn1);

		await expect(btn1).toBeVisible();
		await expect(btn2).toBeVisible();
		await expect(btn3).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn1).toHaveFocus();
		await expect(btn1.disabled).toBe(false);
	},
};

export const Large: Story = {
	args: {
		options: [
			{
				label: '1st label',
				size: 'large',
			},
			{
				label: '2nd label',
				size: 'large',
			},
			{
				label: '3rd label',
				size: 'large',
			},
		],
		vertical: false,
	},

	render: (args) => {
		return {
			Component: ButtonGroup,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn1: HTMLButtonElement = canvas.getByText('1st label');
		const btn2: HTMLButtonElement = canvas.getByText('2nd label');
		const btn3: HTMLButtonElement = canvas.getByText('3rd label');
		const style = window.getComputedStyle(btn1);
		const color = 'rgb(161, 253, 165)';

		await userEvent.click(btn1);

		await expect(btn1).toBeVisible();
		await expect(btn2).toBeVisible();
		await expect(btn3).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn1).toHaveFocus();
		await expect(btn1.disabled).toBe(false);
	},
};
export const Large_Vertical: Story = {
	args: {
		options: [
			{
				label: '1st label',
				size: 'large',
			},
			{
				label: '2nd label',
				size: 'large',
			},
			{
				label: '3rd label',
				size: 'large',
			},
		],
		vertical: true,
	},

	render: (args) => {
		return {
			Component: ButtonGroup,
			props: args,
		};
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);

		const btn1: HTMLButtonElement = canvas.getByText('1st label');
		const btn2: HTMLButtonElement = canvas.getByText('2nd label');
		const btn3: HTMLButtonElement = canvas.getByText('3rd label');
		const style = window.getComputedStyle(btn1);
		const color = 'rgb(161, 253, 165)';

		await userEvent.click(btn1);

		await expect(btn1).toBeVisible();
		await expect(btn2).toBeVisible();
		await expect(btn3).toBeVisible();

		await expect(style.backgroundColor).toBe(color);
		await expect(btn1).toHaveFocus();
		await expect(btn1.disabled).toBe(false);
	},
};
