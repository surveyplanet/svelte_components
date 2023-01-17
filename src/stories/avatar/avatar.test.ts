import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const primary = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
	// const avatar = canvas.getByText('Pro');
	// const style = window.getComputedStyle(avatar);
	// const color = style.getPropertyValue('background-color');
	// const labelColor = style.getPropertyValue('color');
	// const textTransform = style.getPropertyValue('text-transform');
	// expect(avatar).toBeTruthy();
	// expect(avatar).toHaveClass('sp-avatar');
	// expect(color).toBe('rgb(255, 233, 120)');
	// expect(labelColor).toBe('rgb(22, 33, 55)');
	// expect(textTransform).toBe('uppercase');
};
