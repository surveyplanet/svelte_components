<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';

	import Toggle from '../../lib/Toggle.svelte';
	import { within, userEvent } from '@storybook/testing-library';
	import { expect } from '@storybook/jest';

	let play = {
		default: async <T extends { canvasElement: HTMLElement }>(res: T) => {
			const canvas = within(res.canvasElement);

			const toggle: HTMLInputElement = canvas.getByRole('checkbox');
			await userEvent.click(toggle);

			expect(toggle.disabled).toBe(false);
		},
		disabled: async <T extends { canvasElement: HTMLElement }>(res: T) => {
			const canvas = within(res.canvasElement);

			const toggle: HTMLInputElement = canvas.getByRole('checkbox');

			expect(toggle.disabled).toBe(true);
		},

		tall: async <T extends { canvasElement: HTMLElement }>(res: T) => {
			const canvas = within(res.canvasElement);

			const toggle: HTMLInputElement = canvas.getByRole('checkbox');
			await userEvent.click(toggle);

			expect(toggle.disabled).toBe(false);
		},
	};
</script>

<Meta
	title="Toggle/Default"
	component={Toggle} />

<Template let:args>
	<Toggle {...args} />
</Template>

<Story
	name="Default"
	args={{}}
	play={play.default} />

<Story
	name="Disabled"
	args={{ disabled: true }}
	play={play.disabled} />

<Story
	name="Tall"
	args={{ tall: true }}
	play={play.tall} />
