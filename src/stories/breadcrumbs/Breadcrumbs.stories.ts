import type { Meta, StoryObj } from '@storybook/svelte';
import Breadcrumbs from '../../lib/Breadcrumbs.svelte';
import Documentation from './breadcrumbs.mdx';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<Breadcrumbs> = {
	title: 'Breadcrumbs/Default',
	component: Breadcrumbs,
	parameters: {
		docs: {
			page: Documentation,
		},
	},
	argTypes: {
		breadcrumbs: {
			control: {
				type: null,
			},
		},
	},
};

export default meta;

type Story = StoryObj<Breadcrumbs>;

export const Basic: Story = {
	args: {
		breadcrumbs: [
			{
				name: 'Home',
				url: '/',
			},
			{
				name: 'Our test survey will show you how its done as an example ',
				url: '/about',
			},
			{
				name: 'Contact',
				url: '/contact',
			},
			{
				name: 'Submit',
				url: '/submit',
			},
		],
	},
	render: (args: StoryObj) => {
		return {
			Component: Breadcrumbs,
			props: args,
		};
	},
	play: async <T extends { canvasElement: HTMLElement }>(res: T) => {
		const canvas = within(res.canvasElement);

		const home = canvas.getByText('Home');
		const elipsees = canvas.getByText(
			'Our test survey will show you how its done as an example'
		);
		const contact = canvas.getByText('Contact');
		const submit = canvas.getByText('Submit');
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
