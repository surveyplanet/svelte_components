import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const primary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const avatar: HTMLButtonElement = canvas.getByRole('button');

	const style = window.getComputedStyle(avatar);
	const color = style.getPropertyValue('background-color');
	const img = canvas.getByRole('img');

	expect(avatar).toBeTruthy();
	expect(avatar).toHaveClass('sp-avatar');
	expect(color).toBe('rgb(255, 177, 227)');
	expect(style.width).toBe('36px');
	expect(style.height).toBe('36px');
	expect(style.borderRadius).toBe('100%');
	expect(img).toHaveAttribute(
		'src',
		'https://via.placeholder.com/23/0040FF/888080?text=AARON'
	);
};

export const medium = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const avatar = canvas.getByRole('button');

	const style = window.getComputedStyle(avatar);
	const color = style.getPropertyValue('background-color');
	const img = canvas.getByRole('img');

	expect(avatar).toBeTruthy();
	expect(color).toBe('rgb(255, 233, 120)');
	expect(style.width).toBe('48px');
	expect(style.height).toBe('48px');
	expect(img).toHaveAttribute(
		'src',
		'https://via.placeholder.com/32/0060FF/802080?text=JACK'
	);
};

export const large = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const avatar = canvas.getByRole('button');

	const style = window.getComputedStyle(avatar);
	const color = style.getPropertyValue('background-color');
	const img = canvas.getByRole('img');

	expect(avatar).toBeTruthy();
	expect(color).toBe('rgb(161, 253, 165)');
	expect(style.width).toBe('64px');
	expect(style.height).toBe('64px');
	expect(img).toHaveAttribute(
		'src',
		'https://via.placeholder.com/38/0020FF/898080?text=DYLAN'
	);
};
