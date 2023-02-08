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
		cancelButtonLabel: {
			control: 'text',
			defaultValue: 'Cancel',
		},
		challenge: { control: 'text', defaultValue: '' },
		challengeLabel: { control: 'text', defaultValue: '' },
		alertCloseHandler: { action: 'alertClose' },
		alertConfirmHandler: { action: 'alertConfirm' },
		closeButtonClickHandler: { action: 'alertNotConfirm' },
		challengeHandler: { action: 'alertChallenge' },
		transitionendHandler: { action: ['alertIn', 'alertOut'] },
	}} />

<Template let:args>
	<Alert
		{...args}
		on:alertOut={args.transitionendHandler}
		on:alertClose={args.alertCloseHandler}
		on:alertConfirm={args.alertConfirmHandler}
		on:alertNotConfirmed={args.alertNotConfirmedHandler}
		on:alertChallenge={args.challengeHandler}>This is the body</Alert>
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
	name="Close"
	let:args
	args={{
		title: 'Close Test',
		subtitle: 'Alert Subtitle',
		type: 'info',
	}}
	play={test.closeAlert} />

<Story
	name="Confirm"
	let:args
	args={{
		confirm: true,
		title: 'Confirm only',
		type: 'info',
		confirmButtonLabel: 'Confirm',
	}}
	play={test.confirmAlert} />

<Story
	name="Challenge"
	let:args
	play={test.challenge}>
	<Alert
		{...args}
		confirm={true}
		title="Challenge"
		subtitle="Subtitle of the alert"
		challenge="test"
		type="challenge"
		confirmButtonLabel="Submit"
		challengeLabel="Challenge Label"
		on:alertChallenge={args.challengeHandler}
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
	name="Confirm with hide delay"
	args={{
		hideDelay: 1000,
		confirm: true,
		title: 'Hidden delay',
		type: 'warning',
	}}
	play={test.delayHideConfirm} />

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
