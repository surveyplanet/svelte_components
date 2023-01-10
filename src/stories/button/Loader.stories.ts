// import type { Meta, StoryObj } from '@storybook/svelte';
// import { BUTTON_MODES, BUTTON_SIZES } from '../../lib/_definitions';
// import Button from '../../lib/Button.svelte';
// import { within, userEvent } from '@storybook/testing-library';
// import { expect } from '@storybook/jest';
// import basicMeta from './Basic';

// const meta: Meta<Button> = {
// 	title: 'Button/Loader',
// 	...basicMeta,
// };

// export default meta;
// type Story = StoryObj<Button>;

// export const LoaderDefault: Story = {
// 	args: {
// 		label: 'Loader',
// 		disabled: true,
// 		loader: true,
// 	},
// 	render: <T extends object>(args: T) => {
// 		return {
// 			Component: Button,
// 			props: args,
// 		};
// 	},
// 	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
// 		const canvas = within(res.canvasElement);

// 		const btn = canvas.getByRole('button');
// 		const style = window.getComputedStyle(btn);
// 		const afterEl = window.getComputedStyle(btn, ':after');
// 		await userEvent.click(btn);

// 		expect(btn).toBeVisible();

// 		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
// 		expect(btn.innerText).toBe('');
// 		expect(btn).toHaveClass('sp-button--loader');
// 		expect(afterEl.animationDuration).toBe('1s');
// 		expect(afterEl.animationTimingFunction).toBe('linear');
// 		expect(afterEl.animationIterationCount).toBe('infinite');
// 	},
// };
// export const LoaderSecondaryLarge: Story = {
// 	args: {
// 		label: 'Loader',
// 		disabled: true,
// 		loader: true,
// 		size: BUTTON_SIZES.LARGE,
// 	},
// 	render: <T extends object>(args: T) => {
// 		return {
// 			Component: Button,
// 			props: args,
// 		};
// 	},
// 	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
// 		const canvas = within(res.canvasElement);

// 		const btn = canvas.getByRole('button');
// 		const style = window.getComputedStyle(btn);

// 		await userEvent.click(btn);

// 		expect(btn).toBeVisible();

// 		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
// 		expect(btn).toHaveClass('sp-button--loader');
// 	},
// };
// export const DefaultSmall: Story = {
// 	args: {
// 		label: 'Default',
// 		disabled: true,
// 		loader: true,
// 		size: BUTTON_SIZES.SMALL,
// 	},
// 	render: <T extends object>(args: T) => {
// 		return {
// 			Component: Button,
// 			props: args,
// 		};
// 	},
// 	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
// 		const canvas = within(res.canvasElement);

// 		const btn = canvas.getByRole('button');
// 		const style = window.getComputedStyle(btn);

// 		await userEvent.click(btn);

// 		expect(btn).toBeVisible();

// 		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
// 		expect(btn).toHaveClass('sp-button--loader');
// 	},
// };

// export const Primary: Story = {
// 	args: {
// 		label: 'Primary',
// 		mode: BUTTON_MODES.PRIMARY,
// 		disabled: true,
// 		loader: true,
// 	},
// 	render: <T extends object>(args: T) => {
// 		return {
// 			Component: Button,
// 			props: args,
// 		};
// 	},
// 	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
// 		const canvas = within(res.canvasElement);

// 		const btn = canvas.getByRole('button');
// 		const style = window.getComputedStyle(btn);

// 		await userEvent.click(btn);

// 		expect(btn).toBeVisible();

// 		expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
// 		expect(btn.innerText).toBe('');
// 		expect(btn).toHaveClass('sp-button--loader');
// 	},
// };
// export const LoaderTertiarySmall: Story = {
// 	args: {
// 		label: 'Loader',
// 		disabled: true,
// 		loader: true,
// 		size: BUTTON_SIZES.SMALL,
// 		mode: BUTTON_MODES.TERTIARY,
// 	},
// 	render: <T extends object>(args: T) => {
// 		return {
// 			Component: Button,
// 			props: args,
// 		};
// 	},
// 	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
// 		const canvas = within(res.canvasElement);

// 		const btn = canvas.getByRole('button');
// 		const style = window.getComputedStyle(btn);

// 		await userEvent.click(btn);

// 		expect(btn).toBeVisible();

// 		expect(style.backgroundColor).toBe('rgb(161, 253, 165)');
// 		expect(btn.innerText).toBe('');
// 		expect(btn).toHaveClass('sp-button--loader');
// 	},
// };
// export const LoaderWithIcon: Story = {
// 	args: {
// 		label: 'Loader',
// 		disabled: true,
// 		loader: true,
// 		icon: 'search',
// 	},
// 	render: <T extends object>(args: T) => {
// 		return {
// 			Component: Button,
// 			props: args,
// 		};
// 	},
// 	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
// 		const canvas = within(res.canvasElement);

// 		const btn = canvas.getByRole('button');
// 		await userEvent.click(btn);

// 		expect(btn).toBeVisible();

// 		expect(btn.innerText).toBe('');
// 		expect(btn).toHaveClass('sp-button--loader');
// 	},
// };

// export const LoaderRounded: Story = {
// 	args: {
// 		label: 'Loader',
// 		disabled: true,
// 		loader: true,
// 		round: true,
// 	},
// 	render: <T extends object>(args: T) => {
// 		return {
// 			Component: Button,
// 			props: args,
// 		};
// 	},
// 	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
// 		const canvas = within(res.canvasElement);

// 		const btn = canvas.getByRole('button');
// 		await userEvent.click(btn);

// 		expect(btn).toBeVisible();

// 		expect(btn.innerText).toBe('');
// 		expect(btn).toHaveClass('sp-button--loader');
// 	},
// };
