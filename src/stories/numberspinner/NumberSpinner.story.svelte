<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	// import source from './source';
	import { NumberSpinner } from '../../lib';
	export let Hst: Histoire;

	let label = 'Number Spinner';
	let step = 1;
	let min = 0;
	let max = 100;
	let value = 0;
	let disabled = false;
	let required = false;
	let overflow = false;
	let time = false;
	let currency = false;
	let id = '';
</script>

<Hst.Story title="Form controls / NumberSpinner">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={label}
			title="Label" />
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Number
			bind:value={step}
			title="Step" />
		<Hst.Number
			bind:value={min}
			title="Min" />
		<Hst.Number
			bind:value={max}
			title="Max" />
		<Hst.Number
			bind:value
			title="Value" />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Checkbox
			bind:value={required}
			title="Required" />
		<Hst.Checkbox
			bind:value={overflow}
			title="Overflow" />
		<Hst.Checkbox
			bind:value={time}
			title="Time" />
		<Hst.Checkbox
			bind:value={currency}
			title="Currency" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<NumberSpinner
			{label}
			{step}
			{min}
			{max}
			{value}
			{disabled}
			{required}
			{overflow}
			{time}
			{currency} />
	</Hst.Variant>
</Hst.Story>
