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
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Title"
				value={title}
				onblur={() => {
					keys += 1;
				}}
				oninput={(e: Event) => {
			title = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Subtitle"
				value={subtitle}
				oninput={(e: Event) => {
			subtitle = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				select="Type"
				value={type}
				selectOptions={['info', 'warning', 'error', 'success']}
				oninput={(e: Event) => {
			type = (e.target as HTMLInputElement).value as 'info' | 'warning' | 'error' | 'success';
		}} />
			<PropsChanger
				number="Hide delay"
				value={hideDelay}
				oninput={(e: Event) => {
			hideDelay = Number((e.target as HTMLInputElement).value);
			
		}}
				onblur={() => {
					keys += 1;
				}} />
			<PropsChanger
				boolean="Confirm"
				value={confirm}
				oninput={(e: Event) => {
			confirm = Boolean((e.target as HTMLInputElement).checked);
		}}
				onblur={() => {
					keys += 1;
				}} />

			<PropsChanger
				text="Confirm button label"
				value={confirmButtonLabel}
				oninput={(e: Event) => {
			confirmButtonLabel = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Cancel button label"
				value={cancelButtonLabel}
				oninput={(e: Event) => {
			cancelButtonLabel = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Challenge"
				value={challenge}
				oninput={(e: Event) => {
			challenge = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Content"
				oninput={(e: Event) => {
			content = (e.target as HTMLInputElement).value;
		}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
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
	</svelte:fragment>
</Layout>
