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

	const changeEventHandler = (e: Event): void => {
		events.push('change');
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
				text="On"
				value={on.toString()}
				textInputHandler={(e: Event) => {
					on = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Disabled"
				value={disabled.toString()}
				textInputHandler={(e: Event) => {
					disabled = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Tall"
				value={tall.toString()}
				textInputHandler={(e: Event) => {
					tall = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Name"
				value={name}
				textInputHandler={(e: Event) => {
					name = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Label"
				value={label}
				textInputHandler={(e: Event) => {
					label = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Prepend Label"
				value={prependLabel.toString()}
				textInputHandler={(e: Event) => {
					prependLabel = (e.target as HTMLInputElement).value === 'true';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Toggle
			on:change={changeEventHandler}
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
