import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const primary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const badge = canvas.getByText('Pro');
	const style = window.getComputedStyle(badge);
	const color = style.getPropertyValue('background-color');
	const labelColor = style.getPropertyValue('color');
	const textTransform = style.getPropertyValue('text-transform');
	expect(badge).toBeTruthy();
	expect(badge).toHaveClass('sp-badge');
	expect(color).toBe('rgb(255, 233, 120)');
	expect(labelColor).toBe('rgb(22, 33, 55)');
	expect(textTransform).toBe('uppercase');
};

export const inverted = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const badge = canvas.getByText('Inverted');
	const style = window.getComputedStyle(badge);
	const color = style.getPropertyValue('background-color');
	const labelColor = style.getPropertyValue('color');
	expect(badge).toBeTruthy();
	expect(badge).toHaveClass('sp-badge');
	expect(color).toBe('rgb(255, 20, 147)');
	expect(labelColor).toBe('rgb(255, 255, 255)');
};

export const overflow = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	const badge = canvas.getByText(
		'Maecenas vitae tortor dolor quis tristique massa.'
	);
	expect(badge).toHaveClass('sp-badge');
};
