<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Alert from '../../lib/Alert.svelte';
	import * as test from './alert.test';
</script>

<Meta
	title="Alert/Default"
	component={Alert}
	argTypes={{
		title: { control: 'text', defaultValue: 'Alert title' },
		subtitle: { control: 'text', defaultValue: 'Alert subtitle' },
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
		on:confirm={args.confirmHandler}
		>There are things you need to know.</Alert>
</Template>

<Story
	name="Default"
	args={{
		title: 'Did you know?',
		subtitle: 'Informational alert',
		type: 'info',
	}}
	play={test.primary} />

<Story
	name="Close"
	let:args
	args={{
		title: 'Close Test',
		type: 'info',
	}}
	play={test.close} />

<Story
	name="Confirm"
	let:args
	args={{
		confirm: true,
		hideDelay: 1000, // make sure this doesn't automatically hide
		title: 'Permanently delete',
		subtitle: 'This cannot be undone.',
		type: 'warning',
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
		type: 'success',
		confirmButtonLabel: 'Yes, delete',
		cancelButtonLabel: 'No, cancel',
		challengeLabel: 'Enter your email address',
		challenge: 'testing@example.com',
	}}
	play={test.challenge} />

<Story
	name="Challenge"
	let:args
	play={test.challenge}>
	<Alert
		{...args}
		title="Are you absolutely sure?"
		subtitle="Due to privacy laws like GDPR and CCPA this cannot be undone."
		type="warning"
		confirm={true}
		confirmButtonLabel="Delete account"
		cancelButtonLabel="Cancel"
		challengeLabel="Email address"
		challenge="testing@example.com">
		<p>
			This will permanently delete your account and all associated data.
		</p>
		<p>If you have a subscription it will be canceled immediately.</p>
		<p>Please type your email address to confirm.</p>
	</Alert>
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
	name="HTML content"
	let:args
	play={test.html}>
	<Alert
		{...args}
		title="HTML"
		type="error"
		subtitle="Subtitle of the alert">
		<h4>Some HTML content</h4>
		<p>
			Had upon could his clay <a
				href="/"
				data-testid="test-link">misery</a> run friends but caught.
		</p>
		<img
			data-testid="test-img"
			src="https://via.placeholder.com/256/00FF00/FFFFFF?text=Test%20Image"
			alt="test" />
	</Alert>
</Story>
