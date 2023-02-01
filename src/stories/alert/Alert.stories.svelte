<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Alert from '../../lib/Alert.svelte';
	// import * as test from './alert.test';
	const test = console.log('hello');
</script>

<Meta
	title="Alert/Default"
	component={Alert}
	argTypes={{
		title: { control: 'text', defaultValue: 'Alert Title' },
		subtitle: { control: 'text', defaultValue: 'Alert Subtitle' },
		type: { control: 'text', defaultValue: 'info' },
		hideDelay: { control: 'number', defaultValue: 0 },
		confirm: { control: 'boolean', defaultValue: true },
		confirmButtonLabel: {
			control: 'text',
			defaultValue: 'Confirm',
		},
		challengeLabel: { control: 'text', defaultValue: '' },
		alertCloseHandler: { action: 'alertClose' },
		alertConfirmHandler: { action: 'alertConfirm' },
		alertInHandler: { action: 'alertIn' },
		alertNotConfirmedHandler: { action: 'alertNotConfirmed' },
		alertOpenHandler: { action: 'alertOpen' },
		alertOutHandler: { action: 'alertOut' },
		challengeHandler: { action: 'challenge' },
	}} />

<Template let:args>
	<Alert
		{...args}
		on:alertClose={args.alertCloseHandler}
		on:alertConfirm={args.alertConfirmHandler}
		on:alertIn={args.alertInHandler}
		on:alertNotConfirmed={args.alertNotConfirmedHandler}
		on:alertOpen={args.alertOpenHandler}
		on:alertOut={args.alertOutHandler}>This is the body</Alert>
</Template>

<Story
	name="Default"
	args={{
		title: 'Alert Title',
		subtitle: 'Alert Subtitle',
	}} />

<Story
	name="Confirm"
	args={{
		confirm: true,
		title: 'Confirm only',
	}} />

<Story
	name="Challenge"
	let:args>
	<Alert
		{...args}
		title="Challenge"
		subtitle="Subtitle of the alert"
		challenge="test"
		challengeLabel="Challenge Label"
		on:challenge={(args.challengeHandler, test)}>This is the body</Alert>
</Story>

<Story
	name="Hidden Delay"
	args={{
		hideDelay: 3000,
		title: 'Hidden Delay',
	}} />

<Story
	name="HTML"
	let:args>
	<Alert
		{...args}
		title="HTML"
		subtitle="Subtitle of the alert"><p>Test the HTML</p></Alert>
</Story>
