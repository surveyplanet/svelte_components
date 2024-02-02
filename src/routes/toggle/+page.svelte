<script lang="ts">
	import { Toggle } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as boolean[];
	let keys = $state(0);

	let id = $state((Date.now() + Math.random()).toString(36));
	let on = $state(false);
	let disabled = $state(false);
	let tall = $state(false);
	let name: string = $state('');
	let label = $state('Toggle switch');
	let prependLabel = $state(false);
	// let meridiemIndicator = false;

	const changeEventHandler = (toggle: boolean): void => {
		events.push(toggle);
	};
</script>

<Layout
	component="Toggle"
	example={source(id, on, disabled, tall, name, label, prependLabel)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Name"
			text
			bind:value={name} />
		<PropsChanger
			label="Label"
			text
			bind:value={label} />
		<PropsChanger
			label="On"
			checkbox
			bind:value={on} />
		<PropsChanger
			label="Disabled"
			checkbox
			bind:value={disabled} />
		<PropsChanger
			label="Tall"
			checkbox
			bind:value={tall} />

		<PropsChanger
			label="Prepend Label"
			checkbox
			bind:value={prependLabel} />
	{/snippet}
	{#snippet main()}
		<Toggle
			onChange={changeEventHandler}
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
