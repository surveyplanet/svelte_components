import Button from '../../lib/Button.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const Large = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Large');
	expect(btn.offsetHeight).toBe(48);
};

export const Medium = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Medium');
	expect(btn.offsetHeight).toBe(40);
};

export const Small = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const btn = canvas.getByRole('button');
	const style = window.getComputedStyle(btn);

	await userEvent.click(btn);

	expect(btn).toBeVisible();

	expect(style.backgroundColor).toBe('rgb(181, 152, 255)');
	expect(btn.innerText).toBe('Small');
	expect(btn.offsetHeight).toBe(24);
};
