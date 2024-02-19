<script lang="ts">
	import { ComponentEvent, Toggle } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let events = $state([]) as boolean[];

	let id = $state((Date.now() + Math.random()).toString(36));
	let on = $state(false);
	let disabled = $state(false);
	let tall = $state(true);
	let name: string = $state('');
	let label = $state('Toggle switch');
	let prependLabel = $state(false);

	const onToggleChange = (event: ComponentEvent<boolean>): void => {
		events.push(event.value!);
	};
</script>

<Layout
	component="Toggle"
	example={source({ id, on, disabled, tall, name, label, prependLabel })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Name"
			bind:value={name} />
		<PropsChanger
			label="Label"
			bind:value={label} />
		<PropsChanger
			label="On"
			bind:value={on} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Tall"
			bind:value={tall} />

		<PropsChanger
			label="Prepend Label"
			bind:value={prependLabel} />
	{/snippet}
	{#snippet main()}
		<Toggle
			{onToggleChange}
			{id}
			{on}
			{disabled}
			{tall}
			{name}
			{label}
			{prependLabel} />
	{/snippet}
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
