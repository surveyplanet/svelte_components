<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { primary, inverted, icon } from './badge.test';
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
	name="Badge primary"
	play={primary} />

<Story
	name="Badge inverted"
	source
	let:args
	play={inverted}>
	<Badge
		{...args}
		bgColor="black"
		textColor="white">Inverted</Badge>
</Story>

<Story
	name="Badge with icon"
	source
	let:args
	play={icon}>
	<Badge
		{...args}
		bgColor="black"
		textColor="white">
		<Icon
			name="add"
			color="white" />
		Inverted with icon
	</Badge>
</Story>
