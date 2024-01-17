<script lang="ts">
	import { Alert } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	let title = $state('Did you know?');
	let subtitle = $state('Informational alert');
	let type: 'info' | 'warning' | 'error' | 'success' = $state('info');
	let hideDelay = $state(0);
	let confirm = $state(true);
	let confirmButtonLabel = $state('Confirm');
	let cancelButtonLabel = $state('Cancel');
	let challenge = $state('yes');
	let content = $state(
		'Instructions on how to reset your password have been sent to: <strong style="color:black;">diego@studiovoila.com</strong>. If the email doesn’t arrive in the next 5 minutes check your spam folder.'
	);

	const openHandler = () => {
		events.push('open');
	};
	const inHandler = () => {
		events = ['in'];
	};
	const closeHandler = () => {
		events = ['close'];
	};
	const outHandler = () => {
		events = ['out'];
	};
	const confirmHandler = () => {
		events = ['confirm'];
	};
</script>

<Layout
	component="Alert"
	example={source(
		title,
		subtitle,
		type,
		hideDelay,
		confirm,
		confirmButtonLabel,
		cancelButtonLabel,
		challenge
	)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Title"
				value={title}
				blurHandler={() => {
					keys += 1;
				}}
				textInputHandler={(e: Event) => {
			title = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Subtitle"
				value={subtitle}
				textInputHandler={(e: Event) => {
			subtitle = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Type"
				value={type}
				textInputHandler={(e: Event) => {
			type = (e.target as HTMLInputElement).value as 'info' | 'warning' | 'error' | 'success';
		}} />
			<PropsChanger
				number="Hide delay"
				value={hideDelay}
				textInputHandler={(e: Event) => {
			hideDelay = Number((e.target as HTMLInputElement).value);
		}} />
			<PropsChanger
				boolean="Confirm"
				value={confirm}
				textInputHandler={(e: Event) => {
			confirm = Boolean((e.target as HTMLInputElement).value);
		}} />
			<PropsChanger
				text="Confirm button label"
				value={confirmButtonLabel}
				textInputHandler={(e: Event) => {
			confirmButtonLabel = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Cancel button label"
				value={cancelButtonLabel}
				textInputHandler={(e: Event) => {
			cancelButtonLabel = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Challenge"
				value={challenge}
				textInputHandler={(e: Event) => {
			challenge = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Content"
				textInputHandler={(e: Event) => {
			content = (e.target as HTMLInputElement).value;
		}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		{#key keys}
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
				{challenge}>
				{@html content}
			</Alert>
		{/key}
	</svelte:fragment>
</Layout>
