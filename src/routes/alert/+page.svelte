<script lang="ts">
	import { Alert } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

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
	bind:events>
	{#snippet controls()}
		<PropsChanger
			text={true}
			label="Title"
			bind:value={title} />
		<PropsChanger
			label="Subtitle"
			text={true}
			value={subtitle} />
		<PropsChanger
			select={true}
			label="Type"
			bind:value={type}
			selectOptions={['info', 'warning', 'error', 'success']} />
		<PropsChanger
			number={true}
			label="Hide delay"
			bind:value={hideDelay} />
		<PropsChanger
			checkbox={true}
			label="Confirm"
			bind:value={confirm} />

		<PropsChanger
			label="Confirm button label"
			text={true}
			bind:value={confirmButtonLabel} />
		<PropsChanger
			label="Cancel button label"
			text={true}
			bind:value={cancelButtonLabel} />
		<PropsChanger
			label="Challenge"
			text={true}
			bind:value={challenge} />
		<PropsChanger
			label="Content"
			text={true}
			bind:value={content} />
	{/snippet}
	{#snippet main()}
		{#key keys}
			<Alert
				onopen={openHandler}
				onin={inHandler}
				onclose={closeHandler}
				onout={outHandler}
				onconfirm={confirmHandler}
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
	{/snippet}
</Layout>
