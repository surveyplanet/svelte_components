<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Icon from '../../lib/Icon.svelte';
	import Documentation from './icon.mdx';
	import { within } from '@storybook/testing-library';
	import { expect } from '@storybook/jest';
	let play = {
		basic: async <T extends { canvasElement: HTMLElement }>(res: T) => {
			const canvas = within(res.canvasElement);

			const icon: HTMLElement = canvas.getByTitle('icon search');

			// Can't get size of icon for some reason.
			// const dimensions: DOMRect = icon.getBoundingClientRect();
			// console.log('dimensions:', dimensions);

			expect(icon).toBeVisible();
			expect(icon).toBeTruthy();
			// expect(icon.offsetHeight).toBe(48);
		},
	};
</script>

<Meta
	title="Icon/Default"
	component={Icon} />

<Template let:args>
	<Icon {...args} />
</Template>

<Story
	name="Basic"
	args={{
		name: 'search',
		color: 'black',
	}}
	play={play.basic} />

<Story
	name="Light"
	source
	args={{ name: 'search', color: 'white' }} />

<!-- Dynamic snippet should be disabled for this story -->
