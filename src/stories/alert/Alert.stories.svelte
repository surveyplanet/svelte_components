<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Alert from '../../lib/Alert.svelte';
	import * as test from './alert.test';
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
		on:alertOut={args.alertOutHandler}
		on:challenge={args.challengeHandler}>This is the body</Alert>
</Template>

<Story
	name="Default"
	args={{
		title: 'Alert Title',
		subtitle: 'Alert Subtitle',
		type: 'info',
	}}
	play={test.defaultAlert} />

<Story
	name="Confirm"
	args={{
		confirm: true,
		title: 'Confirm only',
		type: 'info',
	}}
	play={test.confirmAlert} />

<Story
	name="Challenge"
	let:args
	play={test.challenge}>
	<Alert
		{...args}
		title="Challenge"
		subtitle="Subtitle of the alert"
		challenge="test"
		type="challenge"
		challengeLabel="Challenge Label"
		on:challenge={args.challengeHandler}
		on:alertOut={args.alertOutHandler}>This is the body</Alert>
</Story>

<Story
	name="Hidden Delay"
	args={{
		hideDelay: 1000,
		title: 'Hidden Delay',
		type: 'warning',
	}}
	play={test.delayHide} />

<Story
	name="HTML"
	let:args
	play={test.html}>
	<Alert
		{...args}
		title="HTML"
		type="error"
		subtitle="Subtitle of the alert"
		><p class="test-class">Test the HTML</p></Alert>
</Story>
