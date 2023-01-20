import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { MASCOTS } from '../../lib/_definitions';

export const primary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const avatar: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(avatar);
	const color = style.getPropertyValue('background-color');
	const img = canvas.getByRole('img');

	expect(avatar).toBeTruthy();
	expect(avatar).toHaveClass('sp-avatar');
	expect(avatar).toHaveClass('sp-avatar--small');
	expect(color).toBe('rgb(255, 177, 227)');
	expect(style.width).toBe('36px');
	expect(style.height).toBe('36px');
	expect(style.borderRadius).toBe('100%');
	expect(img).toHaveAttribute('src', MASCOTS.aaron);
	await userEvent.click(avatar);
	expect(res.args.clickHandler).toHaveBeenCalled();
};

export const medium = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const avatar = canvas.getByRole('button');
	const style = window.getComputedStyle(avatar);
	const color = style.getPropertyValue('background-color');
	const img = canvas.getByRole('img');

	expect(avatar).toBeTruthy();
	expect(color).toBe('rgb(158, 228, 250)');
	expect(style.width).toBe('48px');
	expect(style.height).toBe('48px');
	expect(img).toHaveAttribute(
		'src',
		'https://via.placeholder.com/512/FFB1E3/FFFFFF?text=CUSTOM'
	);
};

export const large = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const avatar = canvas.getByRole('button');
	const style = window.getComputedStyle(avatar);
	const color = style.getPropertyValue('background-color');
	const img = canvas.getByRole('img');

	expect(avatar).toBeTruthy();
	expect(avatar).toHaveClass('sp-avatar--large');
	expect(color).toBe('rgb(161, 253, 165)');
	expect(style.width).toBe('64px');
	expect(style.height).toBe('64px');
	expect(img).toHaveAttribute('src', MASCOTS.dylan);
};

export const disabled = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const avatar = canvas.getByRole('presentation');

	expect(avatar).toBeTruthy();

	await userEvent.click(avatar);
	expect(res.args.clickHandler).not.toHaveBeenCalled();
};
