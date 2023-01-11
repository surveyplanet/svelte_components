import type { StoryObj } from '@storybook/svelte';
import Breadcrumbs from '../../lib/Breadcrumbs.svelte';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

export const render = (args: StoryObj) => {
	return {
		Component: Breadcrumbs,
		props: args,
	};
};
export const play = async <T extends { canvasElement: HTMLElement }>(
	res: T
) => {
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

	expect(styleHome).toHaveProperty('color', 'rgb(115, 122, 135)');
	expect(styleHome).toHaveProperty('cursor', 'pointer');
	expect(styleHome).toHaveProperty(
		'text-decoration',
		'none solid rgb(115, 122, 135)'
	);
};
