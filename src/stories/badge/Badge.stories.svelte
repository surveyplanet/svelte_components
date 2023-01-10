<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { doc } from 'prettier';

	import Badge from '../../lib/Badge.svelte';
	import { within } from '@storybook/testing-library';
	import { expect } from '@storybook/jest';
</script>

<Meta
	title="Badge/Default"
	component={Badge}
	parameters={doc} />

<Template let:args>
	<Badge {...args} />
</Template>

<Story
	name="Primary"
	args={{
		label: 'PRO',
	}}
	play={async (res) => {
		const canvas = within(res.canvasElement);

		const badge = canvas.getByText('PRO');

		const style = window.getComputedStyle(badge);
		const color = style.getPropertyValue('background-color');
		const labelColor = style.getPropertyValue('color');
		const textTransform = style.getPropertyValue('text-transform');

		expect(badge).toBeTruthy();
		expect(badge).toHaveClass('sp-badge');
		expect(color).toBe('rgb(255, 233, 120)');
		expect(labelColor).toBe('rgb(38, 43, 53)');
		expect(textTransform).toBe('uppercase');
	}} />

<Story
	name="Inverted"
	source
	args={{ label: 'Inverted', color: 'black', labelColor: 'white' }} />
