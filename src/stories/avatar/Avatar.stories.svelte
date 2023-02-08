<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import * as test from './avatar.test';
	import { SIZES, Avatar } from '../../lib';
</script>

<Meta
	title="Avatar/Default"
	component={Avatar}
	argTypes={{
		clickHandler: { action: 'click' },
		id: { control: 'text' },
		size: {
			control: 'select',
			options: [SIZES.SMALL, SIZES.MEDIUM, SIZES.LARGE],
			defaultValue: SIZES.SMALL,
		},
		imgSrc: { control: 'text' },
	}} />

<Template let:args>
	<Avatar
		{...args}
		on:click={args.clickHandler} />
</Template>

<Story
	name="Primary"
	args={{
		id: 'example@example.com',
	}}
	play={test.primary} />

<Story
	name="Medium"
	play={test.medium}>
	<Avatar
		size={SIZES.MEDIUM}
		imgSrc="https://via.placeholder.com/512/FFB1E3/FFFFFF?text=CUSTOM" />
</Story>

<Story
	name="Large"
	play={test.large}>
	<Avatar
		size={SIZES.LARGE}
		id="uelloworld@surveyplanet.com" />
</Story>

<Story
	name="Disabled"
	play={test.disabled}>
	<Avatar disabled />
</Story>
