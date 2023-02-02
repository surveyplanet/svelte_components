import { within, userEvent, fireEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { delay } from '../../lib';

export const defaultAlert = async (res: StoryBookPlayArgs) => {
	const canvas = within(res.canvasElement);
};
