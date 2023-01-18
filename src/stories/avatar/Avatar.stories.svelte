<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import * as test from './avatar.test';
	import Avatar from '../../lib/Avatar.svelte';
	import { SIZES, COLORS } from '../../lib/_definitions';
</script>

<Meta
	title="Avatar/Default"
	component={Avatar}
	argTypes={{
		clickHandler: { action: 'clickEvent' },
		email: { control: 'text' },
		size: {
			control: 'select',
			options: [SIZES.SMALL, SIZES.MEDIUM, SIZES.LARGE],
			defaultValue: SIZES.SMALL,
		},
		bgColor: { control: 'color' },
	}} />

<Template
	let:args
	parameters={{
		backgrounds: {
			default: 'darkest',
		},
	}}>
	<Avatar
		{...args}
		on:clickEvent={args.clickHandler} />
</Template>

<Story
	name="Primary"
	args={{
		email: 'jonah@surveyplanet.com',
	}}
	play={test.primary} />

<Story
	name="Medium"
	play={test.medium}>
	<Avatar
		size={SIZES.MEDIUM}
		email="slenum@gmail.com"
		imgSrc="https://via.placeholder.com/512/FFB1E3/FFFFFF?text=CUSTOM" />
</Story>

<Story
	name="Large"
	play={test.large}>
	<Avatar
		size={SIZES.LARGE}
		email="uelloworld@surveyplanet.com" />
</Story>
