import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const basic = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const icon: HTMLElement = canvas.getByTitle('icon search');

	// Can't get size of icon for some reason.
	// const dimensions: DOMRect = icon.getBoundingClientRect();
	// console.log('dimensions:', dimensions);

	expect(icon).toBeVisible();
	expect(icon).toBeTruthy();
	// expect(icon.offsetHeight).toBe(48);
};
export const light = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
	const canvas = within(res.canvasElement);

	const icon: HTMLElement = canvas.getByTitle('icon search');

	expect(icon).toBeVisible();
	expect(icon).toBeTruthy();
	// expect(icon.getAttribute('width')).toBe(48);
};
