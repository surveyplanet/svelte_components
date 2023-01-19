<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import * as tests from './badge.test';
	import Badge from '../../lib/Badge.svelte';
	import Icon from '../../lib/Icon.svelte';
	import { COLORS } from '../../lib/_definitions';
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
	source
	let:args
	play={tests.inverted}>
	<Badge
		{...args}
		bgColor="deeppink"
		textColor="white">Inverted</Badge>
</Story>

<Story
	name="Overflow"
	source
	let:args
	play={tests.overflow}>
	<div
		style="width:150px; height:50px; background-color: {COLORS.blue}; padding: 10px">
		<Badge {...args}
			>Maecenas vitae tortor dolor quis tristique massa.</Badge>
	</div>
</Story>
