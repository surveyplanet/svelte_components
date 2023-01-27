<script>
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Alert from '../../lib/Alert.svelte';
	// import * as test from './alert.test';
</script>

<Meta
	title="Alert/Default"
	component={Alert}
	argTypes={{
		title: { control: 'text' },
		subtitle: { control: 'text' },
		body: { control: 'text' },
		html: { control: 'text' },
		type: { control: 'text' },
		hideDelay: { control: 'number' },
		confirm: { control: 'boolean' },
		confirmButtonLabel: { control: 'text' },
		cancelButtonLabel: { control: 'text' },
		challenge: { control: 'text' },
	}} />

<Template let:args>
	<Alert
		{...args}
		on:alertClose={args.alertCloseHandler}
		on:alertConfirm={args.alertConfirmHandler}
		on:alertIn={args.alertInHandler}
		on:alertNotConfirmed={args.alertNotConfirmedHandler}
		on:alertOpen={args.alertOpenHandler}
		on:alertOut={args.alertOutHandler} />
</Template>

<Story name="Alert" />
