<script lang="ts">
	import { Alert } from '$lib';
	import { Layout, PropsChanger } from '../../layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let visible = $state(true);
	let title = $state('');
	let subtitle = $state('Informational alert');
	let type: 'info' | 'warning' | 'error' | 'success' = $state('info');
	let hideDelay = $state(0);
	let confirm = $state(false);
	let confirmButtonLabel = $state('Confirm');
	let cancelButtonLabel = $state('Cancel');
	let challenge = $state('yes');
	let content = $state(
		'Instructions on how to reset your password have been sent to: <strong style="color:black;">diego@studiovoila.com</strong>. If the email doesn’t arrive in the next 5 minutes check your spam folder.'
	);

	let rest = {
		id: 'alert',
	};

	const onAlertOpen = () => {
		events.push('open');
	};
	const onAlertIn = () => {
		events = ['in'];
	};
	const onAlertClose = () => {
		events = ['close'];
	};
	const onAlertOut = () => {
		events = ['out'];
	};
	const onAlertConfirm = () => {
		events = ['confirm'];
	};
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<Layout
	component="Alert"
	example={source({
		visible,
		title,
		subtitle,
		type,
		hideDelay,
		confirm,
		confirmButtonLabel,
		cancelButtonLabel,
		challenge,
	})}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Visible"
			bind:value={visible} />
		<PropsChanger
			label="Title"
			bind:value={title} />
		<PropsChanger
			label="Subtitle"
			bind:value={subtitle} />
		<PropsChanger
			label="Type"
			bind:value={type}
			selectOptions={['info', 'warning', 'error', 'success']} />
		<PropsChanger
			label="Hide delay"
			bind:value={hideDelay} />
		<PropsChanger
			label="Confirm"
			bind:value={confirm} />
		<PropsChanger
			label="Confirm button label"
			bind:value={confirmButtonLabel} />
		<PropsChanger
			label="Cancel button label"
			bind:value={cancelButtonLabel} />
		<PropsChanger
			label="Challenge"
			bind:value={challenge} />
		<PropsChanger
			label="Content"
			bind:value={content} />
	{/snippet}
	{#snippet main()}
		<Alert
			{cancelButtonLabel}
			{challenge}
			{confirm}
			{confirmButtonLabel}
			{hideDelay}
			{onAlertClose}
			{onAlertConfirm}
			{onAlertIn}
			{onAlertOpen}
			{onAlertOut}
			{subtitle}
			{title}
			{type}
			bind:visible
			{...rest}>
			{@html content}
		</Alert>
	{/snippet}
</Layout>
