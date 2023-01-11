import Button from '../../lib/Button.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import Documentation from './button.mdx';

<<<<<<< HEAD:src/stories/button/button.test.ts
=======
export const parameters = {
	docs: {
		page: Documentation,
	},
};

export const argTypes = {
	label: { control: 'text' },
	disabled: { control: 'boolean' },
	loader: { control: 'boolean' },
	round: { control: 'boolean' },
	mode: {
		control: { type: 'select' },
		options: ['primary', 'secondary', 'tertiary', 'quaternary', 'dark'],
	},
	size: {
		control: { type: 'select' },
		options: ['small', 'medium', 'large'],
	},
	icon: {
		control: { type: 'select' },
		options: ['add', 'search', 'delete', 'close', 'menu'],
	},
};

>>>>>>> origin/ssf:src/stories/button/buttonFunctions.ts
export const primary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Button');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};
export const render = <T extends object>(args: T) => {
	return {
		Component: Button,
		props: args,
	};
};

export const secondary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(255, 233, 120)');
	expect(btn.innerText).toBe('Secondary');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};

export const tertiary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(161, 253, 165)');
	expect(btn.innerText).toBe('Tertiary');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};

export const quaternary = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(158, 228, 250)');
	expect(btn.innerText).toBe('Quaternary');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};
export const dark = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(22, 33, 55)');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};
export const light = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(255, 255, 255)');
	expect(btn.innerText).toBe('Light');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};

export const rounded = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Rounded');
	expect(btn).toHaveFocus();
	expect(btn.disabled).toBe(false);
};

export const disabled = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);
	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(236, 229, 255)');
	expect(btn.innerText).toBe('Disabled');
	expect(btn).not.toHaveFocus();
	expect(btn.disabled).toBe(true);
};

export const block = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);
	const btn: HTMLButtonElement = canvas.getByRole('button');
	// console.log(global.document.body.style.padding); // there is no padding
	expect(btn).toBeVisible();
	const paddingSize = 35; // padding is approximately 35px
	expect(btn.offsetWidth).toBeGreaterThan(global.innerWidth - paddingSize);
};
