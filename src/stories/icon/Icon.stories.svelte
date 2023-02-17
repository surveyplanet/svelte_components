<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { COLORS, Icon } from '../../lib';
	import ICON_DATA from '../../lib/_icon_data';
	import * as test from './icon.test';
</script>

<Meta
	title="Icon/Default"
	component={Icon}
	args={{
		color: COLORS.slate_dark,
		size: 24,
		name: 'search',
		debug: false,
	}}
	argTypes={{
		name: {
			control: { type: 'select' },
			options: Object.keys(ICON_DATA),
		},
		size: {
			control: 'select',
			options: [8, 16, 20, 24, 32, 48, 64, 128, 256, 512],
		},
		color: { control: 'color' },
		debug: { control: 'boolean' },
	}} />

<Template let:args>
	<Icon {...args} />
</Template>

<Story
	name="Basic"
	args={{
		name: 'search',
		color: COLORS.purple_dark,
	}}
	play={test.basic} />

<Story
	name="Light"
	source
	args={{
		name: 'search',
		color: COLORS.light_purple_light,
	}}
	parameters={{
		backgrounds: {
			default: COLORS.slate_dark,
		},
	}}
	play={test.light} />

<Story
	name="Large"
	args={{
		name: 'trash',
		color: COLORS.green_dark,
		size: 512,
	}}
	play={test.large} />

<Story
	name="Small"
	args={{
		name: 'x',
		size: 12,
		color: COLORS.pink_dark,
	}}
	play={test.small} />

<Story
	name="Filled"
	args={{
		name: 'ellipses',
		color: COLORS.blue_dark,
	}}
	play={test.filled} />

<Story
	name="Not found"
	args={{
		name: 'noop',
		size: 12,
		color: 'blue',
	}}
	play={test.notFound} />
