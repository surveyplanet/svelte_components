<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	// import source from './source';
	import { Spinner } from '../../lib';
	export let Hst: Histoire;

	let label = 'Number Spinner';
	let step = 1;
	let min = 0;
	let max = 1000;
	let value: number | undefined = undefined;
	let disabled = false;
	let required = false;
	let overflow = false;
	let id = (Date.now() + Math.random()).toString(36);
	let placeholder = 'Please put in the number';
	let dragSpeed = 10;

	const spinnerEventHandler = (e: CustomEvent) => {
		logEvent(e.type, e);
	};
</script>

<Hst.Story title="Form controls / Spinner">
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
		<Hst.Text
			bind:value={placeholder}
			title="Placeholder" />
		<Hst.Number
			bind:value={dragSpeed}
			title="Drag speed" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<Spinner
			{label}
			{step}
			{min}
			{max}
			{value}
			{disabled}
			{required}
			{overflow}
			{placeholder}
			on:blur={spinnerEventHandler}
			on:change={spinnerEventHandler}
			on:focus={spinnerEventHandler}
			on:update={spinnerEventHandler} />
	</Hst.Variant>
</Hst.Story>
