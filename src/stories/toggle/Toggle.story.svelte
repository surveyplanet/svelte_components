<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	import source from './source';
	import { Toggle } from '../../lib';

	export let Hst: Histoire;

	let id = (Date.now() + Math.random()).toString(36);
	let on = false;
	let disabled = false;
	let tall = false;
	let name: string;
	let label = 'Toggle switch';
	let prependLabel = false;
	// let meridiemIndicator = false;

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};
</script>

<Hst.Story title="Form controls / Toggle">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Text
			bind:value={name}
			title="Name" />
		<Hst.Text
			bind:value={label}
			title="Label" />
		<Hst.Checkbox
			bind:value={on}
			title="On" />
		<Hst.Checkbox
			bind:value={prependLabel}
			title="Prepend label" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Checkbox
			bind:value={tall}
			title="Tall" />
		<!-- <Hst.Checkbox
			bind:value={meridiemIndicator}
			title="Time switch" /> -->
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<div class="wrapper">
			<Toggle
				on:change={changeEventHandler}
				{id}
				{name}
				{label}
				{on}
				{prependLabel}
				{tall}
				{disabled} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
