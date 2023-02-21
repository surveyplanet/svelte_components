<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import * as tests from './badge.test';
	import { COLORS, Badge } from '../../lib';
</script>

<Meta
	title="Badge/Default"
	component={Badge}
	argTypes={{
		bgColor: { control: 'color', defaultValue: COLORS.yellow },
		textColor: { control: 'color', defaultValue: COLORS.slate_dark },
	}} />

<Template let:args>
	<Badge {...args}>Pro</Badge>
</Template>

<Story
	name="Primary"
	play={tests.primary} />

<Story
	name="Alternate color"
	let:args
	play={tests.inverted}>
	<Badge
		{...args}
		bgColor="deeppink"
		textColor="white">Inverted</Badge>
</Story>

<Story
	name="Overflow"
	let:args
	play={tests.overflow}>
	<div
		style="width:150px; height:50px; background-color: {COLORS.blue}; padding: 10px">
		<Badge {...args}>Cared for memory and knew climes long finds.</Badge>
	</div>
</Story>
