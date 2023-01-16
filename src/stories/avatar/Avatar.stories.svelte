<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import { primary } from './avatar.test';
	import Avatar from '../../lib/Avatar.svelte';
	import Icon from '../../lib/Icon.svelte';
	import { COLORS } from '../../lib/_definitions';
</script>

<Meta
	title="Avatar/Default"
	component={Avatar}
	argTypes={{
		email: { control: 'text' },
	}} />

<Template let:args>
	<Avatar
		{...args}
		on:clickEvent={args.clickHandler} />
</Template>

<Story
	name="Small"
	play={primary}>
	<Avatar
		size="small"
		email=" hello1@killbill.com
		">
		<img
			src="https://via.placeholder.com/32"
			alt="placeholder" />
	</Avatar>
</Story>

<Story name="Medium">
	<Avatar
		size="medium"
		email="plenum@gmail.com">
		<img
			src="https://via.placeholder.com/32"
			alt="placeholder" />
	</Avatar>
</Story>

<Story name="Large">
	<Avatar
		size="large"
		email="helloworld@surveyplanet.com"
		><img
			src="https://via.placeholder.com/40"
			alt="placeholder" /></Avatar>
</Story>
