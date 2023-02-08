<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { COLORS, Icon } from '../../lib';
	import { basic, light } from './icon.test';
</script>

<Meta
	title="Icon/Default"
	component={Icon}
	argTypes={{
		name: { control: 'text' },
		size: {
			control: 'select',
			options: [8, 16, 20, 24, 32, 48, 64, 128, 256, 512],
			defaultValue: 48,
		},
		color: { control: 'color', defaultValue: '#FFFFFF' },
		debug: { control: 'boolean', defaultValue: false },
	}} />

<Template let:args>
	<Icon {...args} />
</Template>

<Story
	name="Basic"
	args={{
		name: 'search',
		color: 'black',
	}}
	play={basic} />

<Story
	name="Light"
	source
	args={{
		name: 'search',
		color: 'white',
	}}
	parameters={{
		backgrounds: {
			default: COLORS.slate_dark,
		},
	}}
	play={light} />
