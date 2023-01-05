import type { Meta, StoryObj } from '@storybook/svelte';

import Breadcrumbs from '../../lib/Breadcrumbs.svelte';
import Documentation from './breadcrumbs.mdx';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

// More on how to set up stories at: https://storybook.js.org/docs/svelte/writing-stories/introduction#default-export
const meta: Meta<Breadcrumbs> = {
	title: 'Breadcrumbs/Default',
	component: Breadcrumbs,
	parameters: {
		docs: {
			page: Documentation,
		},
	},
	argTypes: [
		{
			name: 'name',
			url: 'https://www.google.com',
		},
	],
};

export default meta;

type Story = StoryObj<Breadcrumbs>;

export const Default: Story = {
	render: (args: StoryObj) => {
		return {
			Component: Breadcrumbs,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const home: HTMLElement = canvas.getByText('Home');
		const elipsees: HTMLElement = canvas.getByText(
			'Our test survey will show you how its done as an example'
		);
		const contact: HTMLElement = canvas.getByText('Contact');
		const submit: HTMLElement = canvas.getByText('Submit');
		const styleHome = window.getComputedStyle(home);

		expect(home).toBeTruthy();
		expect(elipsees).toBeTruthy();
		expect(contact).toBeTruthy();
		expect(submit).toBeTruthy();

		expect(home).toHaveAttribute('href', '/');
		expect(elipsees).toHaveAttribute('href', '/about');
		expect(contact).toHaveAttribute('href', '/contact');
		expect(submit).toHaveAttribute('href', '/submit');

		// expect(home).toHaveAttribute('aria-current', 'page');
		// expect(btn2).toHaveAttribute('aria-current', 'page');
		// expect(contact).toHaveAttribute('aria-current', 'page');
		// expect(submit).toHaveAttribute('aria-current', 'page');

		expect(styleHome).toHaveProperty('color', 'rgb(0, 0, 0)');
		expect(styleHome).toHaveProperty('cursor', 'pointer');
		expect(styleHome).toHaveProperty(
			'text-decoration',
			'none solid rgb(0, 0, 0)'
		);
	},
};
