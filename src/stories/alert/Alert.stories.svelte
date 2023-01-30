<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Alert from '../../lib/Alert.svelte';
	// import * as test from './alert.test';
</script>

<Meta
	title="Alert/Default"
	component={Alert}
	argTypes={{
		title: { control: { type: 'text' }, defaultValue: 'Alert Title' },
		subtitle: { control: { type: 'text' }, defaultValue: 'Alert Subtitle' },
		body: { control: { type: 'text' }, defaultValue: 'Alert Body' },
		html: { control: { type: 'text' }, defaultValue: '' },
		type: { control: { type: 'text' }, defaultValue: 'info' },
		hideDelay: { control: { type: 'number' }, defaultValue: 0 },
		confirm: { control: { type: 'boolean' }, defaultValue: false },
		confirmButtonLabel: {
			control: { type: 'text' },
			defaultValue: 'Confirm',
		},
		cancelButtonLabel: {
			control: { type: 'text' },
			defaultValue: 'Cancel',
		},
		challenge: { control: { type: 'text' }, defaultValue: '' },
		alertCloseHandler: { action: 'alertClose' },
		alertConfirmHandler: { action: 'alertConfirm' },
		alertInHandler: { action: 'alertIn' },
		alertNotConfirmedHandler: { action: 'alertNotConfirmed' },
		alertOpenHandler: { action: 'alertOpen' },
		alertOutHandler: { action: 'alertOut' },
	}} />

<Template let:args>
	<Alert
		{...args}
		title="Alert Title"
		on:alertClose={args.alertCloseHandler}
		on:alertConfirm={args.alertConfirmHandler}
		on:alertIn={args.alertInHandler}
		on:alertNotConfirmed={args.alertNotConfirmedHandler}
		on:alertOpen={args.alertOpenHandler}
		on:alertOut={args.alertOutHandler} />
</Template>

<Story
	name="Default"
	subtitle="What is this alert for?" />
