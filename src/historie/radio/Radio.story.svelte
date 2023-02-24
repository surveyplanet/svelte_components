<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { Radio } from '../../lib';
	import source from './source';

	export let Hst;

	let id: string;
	let name: string;
	let value: string;
	let label = 'Radio button';
	let checked = false;
	let disabled = false;
	let prependLabel = false;

	const changeEventHandler = (e: Event): void => {
		logEvent('change', e);
	};
</script>

<Hst.Story title="Form controls / Radio">
	<svelte:fragment slot="controls">
		<Hst.Checkbox
			bind:value={checked}
			title="Checked" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Checkbox
			bind:value={prependLabel}
			title="Prepend label" />
		<Hst.Text
			bind:value={label}
			title="Label" />
		<Hst.Text
			bind:value={name}
			title="Name" />
		<Hst.Text
			bind:value
			title="Value" />
		<Hst.Text
			bind:value={id}
			title="Id" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<Radio
			on:change={changeEventHandler}
			{checked}
			{disabled}
			{prependLabel}
			{label}
			{name}
			{value}
			{id} />
	</Hst.Variant>
</Hst.Story>
