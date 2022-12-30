// import type { PlayFunctionContext } from '@storybook/types';
import type { Meta, StoryObj } from '@storybook/svelte';
import Toggle from '../../lib/Toggle.svelte';
import { within, userEvent } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Toggle> = {
	title: 'Toggle/Default',
	component: Toggle,
};

export default meta;
type Story = StoryObj<Toggle>;

export const Default: Story = {
	args: {
		disabled: false,
	},
	render: (args: StoryObj) => {
		return {
			Component: Toggle,
			props: args,
		};
	},
};
