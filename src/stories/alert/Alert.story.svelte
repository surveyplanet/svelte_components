<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Alert } from '$lib';
	import { default as source } from './source';

	export let Hst: Histoire;

	let title = 'Did you know?';
	let subtitle = 'Informational alert';
	let type: 'info' | 'warning' | 'error' | 'success' = 'info';
	let hideDelay = 0;
	let confirm = false;
	let confirmButtonLabel = 'Confirm';
	let cancelButtonLabel = 'Cancel';
	let challenge: 'yes';
	let content =
		'Instructions on how to reset your password have been sent to: <strong style="color:black;">diego@studiovoila.com</strong>. If the email doesn’t arrive in the next 5 minutes check your spam folder.';

	const openHandler = (e: Event) => {
		logEvent('open', e);
	};
	const inHandler = (e: Event) => {
		logEvent('in', e);
	};
	const closeHandler = (e: Event) => {
		logEvent('close', e);
	};
	const outHandler = (e: Event) => {
		logEvent('out', e);
	};
	const confirmHandler = (e: Event) => {
		logEvent('confirm', e);
	};
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={type}
			title="Type"
			options={[
				{ label: 'Info', value: 'info' },
				{ label: 'Warning', value: 'warning' },
				{ label: 'Error', value: 'error' },
				{ label: 'Success', value: 'success' },
			]} />

		<Hst.Text
			bind:value={title}
			title="Title" />
		<Hst.Text
			bind:value={subtitle}
			title="Subtitle" />
		<Hst.Number
			bind:value={hideDelay}
			title="Hide delay" />
		<Hst.Checkbox
			bind:value={confirm}
			title="Confirm" />
		<Hst.Text
			bind:value={confirmButtonLabel}
			title="Confirm button label" />
		<Hst.Text
			bind:value={cancelButtonLabel}
			title="Cancel button label" />
		<Hst.Text
			bind:value={challenge}
			title="Challenge" />
		<Hst.Textarea
			bind:value={content}
			title="Content" />
	</svelte:fragment>

	<Hst.Variant
		title="Alert"
		source={source(title, subtitle, type, hideDelay, confirm, confirmButtonLabel, cancelButtonLabel, challenge)}>
		<div class="alert-wrapper">
			<Alert
				on:open={openHandler}
				on:in={inHandler}
				on:close={closeHandler}
				on:out={outHandler}
				on:confirm={confirmHandler}
				{title}
				{subtitle}
				{type}
				{hideDelay}
				{confirm}
				{confirmButtonLabel}
				{cancelButtonLabel}
				{challenge}>{@html content}</Alert>
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	.alert-wrapper {
		padding: 50px;
	}
</style>
