import Button from '../../lib/Button.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const LoaderDefault = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	const afterEl = window.getComputedStyle(btn, ':after');
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
	expect(afterEl.animationDuration).toBe('1s');
	expect(afterEl.animationTimingFunction).toBe('linear');
	expect(afterEl.animationIterationCount).toBe('infinite');
};
export const LoaderSecondaryLarge = async <
	T extends { canvasElement: HTMLElement }
>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn).toHaveClass('sp-button--loader');
};
export const render = <T extends object>(args: T) => {
	return {
		Component: Button,
		props: args,
	};
};
export const DefaultSmall = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn).toHaveClass('sp-button--loader');
};

export const Primary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
};
export const LoaderTertiarySmall = async <
	T extends { canvasElement: HTMLElement }
>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(161, 253, 165)');
	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
};
export const LoaderWithIcon = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
};

export const LoaderRounded = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(btn.innerText).toBe('');
	expect(btn).toHaveClass('sp-button--loader');
};
