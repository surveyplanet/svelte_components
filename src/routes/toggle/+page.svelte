<script lang="ts">
	import { Toggle } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
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
		events.push(JSON.stringify(toggle));
	};
</script>

<Layout
	component="Toggle"
	example={source(id, on, disabled, tall, name, label, prependLabel)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Name"
				value={name}
				oninput={(e: Event) => {
					name = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Label"
				value={label}
				oninput={(e: Event) => {
					label = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				boolean="On"
				value={on}
				oninput={(e: Event) => {
					on = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				boolean="Disabled"
				value={disabled}
				oninput={(e: Event) => {
					disabled = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				boolean="Tall"
				value={tall}
				oninput={(e: Event) => {
					tall = (e.target as HTMLInputElement).checked
				}} />

			<PropsChanger
				boolean="Prepend Label"
				value={prependLabel}
				oninput={(e: Event) => {
					prependLabel = (e.target as HTMLInputElement).checked
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Toggle
			onchange={changeEventHandler}
			{id}
			{on}
			{disabled}
			{tall}
			{name}
			{label}
			{prependLabel} />
	</svelte:fragment>
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
