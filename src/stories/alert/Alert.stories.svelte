<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Alert from '../../lib/Alert.svelte';
	import * as test from './alert.test';
</script>

<Meta
	title="Alert/Default"
	component={Alert}
	argTypes={{
		title: { control: 'text', defaultValue: '500' },
		subtitle: { control: 'text', defaultValue: 'Internal server error' },
		type: { control: 'text', defaultValue: 'error' },
		hideDelay: { control: 'number', defaultValue: 0 },
		confirm: { control: 'boolean', defaultValue: false },
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
		openHandler: { action: 'open' },
		inHandler: { action: 'in' },
		closeHandler: { action: 'close' },
		outHandler: { action: 'out' },
		confirmHandler: { action: 'confirm' },
	}} />

<Template let:args>
	<Alert
		{...args}
		on:in={args.inHandler}
		on:out={args.outHandler}
		on:close={args.closeHandler}
		on:open={args.openHandler}
		on:confirm={args.confirmHandler} />
</Template>

<Story
	name="Default"
	args={{
		title: 'Alert Title',
		subtitle: 'Alert Subtitle',
		type: 'info',
	}}
	play={test.primary} />

<Story
	name="Close"
	let:args
	args={{
		title: 'Close Test',
		subtitle: 'Alert Subtitle',
		type: 'info',
	}}
	play={test.close} />

<Story
	name="Confirm"
	let:args
	args={{
		confirm: true,
		hideDelay: 1000, // make sure this doesn't automatically hide
		title: 'Confirm only',
		type: 'info',
		confirmButtonLabel: 'Confirm',
	}}
	play={test.confirm} />

<Story
	name="Challenge"
	let:args
	args={{
		confirm: true,
		title: 'Delete account',
		subtitle:
			'If you want to delete your account enter your email address below',
		body: '',
		challenge: 'test',
		type: 'challenge',
		confirmButtonLabel: 'Submit',
		challengeLabel: 'Challenge Label',
	}}
	play={test.challenge} />

<Story
	name="Hidden Delay"
	args={{
		hideDelay: 1000,
		title: 'Hidden Delay',
		type: 'warning',
	}}
	play={test.delayHide} />

<Story
	name="HTML content"
	let:args
	play={test.html}>
	<Alert
		{...args}
		title="HTML"
		type="error"
		subtitle="Subtitle of the alert">
		<h5>Some HTML content</h5>
		<p>
			Had upon could his clay <a href="/">misery</a> run friends but caught.
		</p>
		<img
			src="https://via.placeholder.com/256/00FF00/FFFFFF?text=Test%20Image"
			alt="test" />
	</Alert>
</Story>
