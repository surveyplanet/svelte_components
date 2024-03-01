<script lang="ts">
	import { Alert, ComponentEvent, type AlertProps } from '$lib';
	import { Layout, PropsChanger } from '../../layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	import type { Snippet } from 'svelte';
	let events = $state<
		ComponentEvent<undefined, HTMLElement>[] & EventTarget[]
	>([]);

	let visible: AlertProps['visible'] = $state(undefined);
	let title: AlertProps['title'] = $state('');
	let subtitle: AlertProps['subtitle'] = $state('Informational alert');
	let type: AlertProps['type'] = $state('info');
	let hideDelay: AlertProps['hideDelay'] = $state(0);
	let confirm: AlertProps['confirm'] = $state(false);
	let confirmButtonLabel: AlertProps['confirmButtonLabel'] =
		$state('Confirm');
	let cancelButtonLabel: AlertProps['cancelButtonLabel'] = $state('Cancel');
	let challenge: AlertProps['challenge'] = $state('yes');
	let content: AlertProps['children'] = $state(
		'Instructions on how to reset your password have been sent to: <strong style="color:black;">diego@studiovoila.com</strong>. If the email doesn’t arrive in the next 5 minutes check your spam folder.'
	) as unknown as Snippet;

	const onAlertOpen = (event: ComponentEvent<undefined, HTMLElement>) => {
		events.push(event);
	};
	const onAlertIn = (event: ComponentEvent<undefined, HTMLElement>) => {
		events.push(event);
	};
	const onAlertClose = (event: ComponentEvent<undefined, HTMLElement>) => {
		events.push(event);
	};
	const onAlertOut = (event: ComponentEvent<undefined, HTMLElement>) => {
		events.push(event);
	};
	const onAlertConfirm = (event: ComponentEvent<undefined, HTMLElement>) => {
		events.push(event.target);
	};

	let btoaProps = $derived(
		btoa(
			JSON.stringify({
				visible,
				title,
				subtitle,
				type,
				hideDelay,
				confirm,
				confirmButtonLabel,
				cancelButtonLabel,
				challenge,
			})
		)
	);
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<Layout
	{btoaProps}
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
			type="boolean"
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
			bind:cancelButtonLabel
			bind:challenge
			bind:confirm
			bind:confirmButtonLabel
			bind:hideDelay
			bind:subtitle
			bind:title
			bind:type
			bind:visible
			{onAlertClose}
			{onAlertConfirm}
			{onAlertIn}
			{onAlertOpen}
			{onAlertOut}>
			{@html content}
		</Alert>
	{/snippet}
</Layout>
