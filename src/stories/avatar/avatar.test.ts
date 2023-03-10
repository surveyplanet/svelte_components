import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { MASCOTS } from '../../lib';

export const primary = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const avatar: HTMLButtonElement = canvas.getByRole('button');
	const style = window.getComputedStyle(avatar);
	const color = style.getPropertyValue('background-color');
	const img = canvas.getByRole('img');

	expect(avatar).toBeTruthy();
	expect(avatar).toHaveClass('sp-avatar');
	expect(avatar).toHaveClass('sp-avatar--small');
	expect(color).toBe('rgb(161, 253, 165)');
	expect(style.width).toBe('36px');
	expect(style.height).toBe('36px');
	expect(style.borderRadius).toBe('100%');
	expect(img).toHaveAttribute('src', MASCOTS.dylan);
	expect(avatar).not.toHaveAttribute('role', 'presentation');
	expect(avatar).toHaveAttribute('aria-label', 'profile image');
	expect(avatar.disabled).toBe(false);
	userEvent.click(avatar);
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

export const large = (res: StoryBookPlayArgs) => {
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

export const disabled = (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const avatar = canvas.getByRole('presentation') as HTMLButtonElement;
	expect(avatar).toBeTruthy();
	userEvent.click(avatar);
	expect(avatar.disabled).toBe(true);
	expect(avatar).toHaveAttribute('role', 'presentation');
	expect(avatar).not.toHaveAttribute('aria-label');
	expect(res.args.clickHandler).not.toHaveBeenCalled();
};
