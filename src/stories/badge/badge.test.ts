import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const Primary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const badge = canvas.getByText('PRO');

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

export const Inverted = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);

	const badge = canvas.getByText('Inverted');

	const style = window.getComputedStyle(badge);
	const color = style.getPropertyValue('background-color');
	const labelColor = style.getPropertyValue('color');

	expect(badge).toBeTruthy();
	expect(badge).toHaveClass('sp-badge');
	expect(color).toBe('rgb(0, 0, 0)');
	expect(labelColor).toBe('rgb(255, 255, 255)');
};
