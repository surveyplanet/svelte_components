<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	import source from './source';
	import { Checkbox } from '../../lib';
	export let Hst: Histoire;

	let id: string;
	let name: 'checkbox';
	let value: string;
	let label = 'Checkbox';
	let checked = false;
	let disabled = false;
	let prependLabel = false;

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};
</script>

<Hst.Story title="Form controls / Checkbox">
	<svelte:fragment slot="controls">
		<Hst.Checkbox
			bind:value={checked}
			title="Checked" />
		<Hst.Text
			bind:value={name}
			title="Name" />
		<Hst.Text
			bind:value
			title="Value" />
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Text
			bind:value={label}
			title="Label" />
		<Hst.Checkbox
			bind:value={prependLabel}
			title="Prepend label" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<Checkbox
			test-id="primary"
			on:change={changeEventHandler}
			{checked}
			{disabled}
			{prependLabel}
			{label}
			{value}
			{name}
			{id} />
	</Hst.Variant>
</Hst.Story>
