<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	// import source from './source';
	import { Spinner } from '../../lib';
	export let Hst: Histoire;

	let label = 'Number Spinner';
	let step = 1;
	let min = 0;
	let max = 10;
	let value: string | undefined = undefined;
	let disabled = false;
	let required = false;
	let overflow = false;
	let type: 'number' | 'time' | 'float' = 'number';
	let timeFormat: '12' | '24' = '24';
	let id = (Date.now() + Math.random()).toString(36);
	let placeholder = '';
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
		<Hst.Text
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
		<Hst.Select
			bind:value={type}
			title="Type"
			options={['number', 'time', 'float']} />
		<Hst.Select
			bind:value={timeFormat}
			title="Time Format"
			options={['12', '24']} />
		<Hst.Text
			bind:value={placeholder}
			title="Placeholder" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<Spinner
			{timeFormat}
			{type}
			{label}
			{step}
			{min}
			{max}
			{value}
			{disabled}
			{required}
			{overflow}
			{placeholder}
			on:blur={() => logEvent('blur', { value })}
			on:change={() => logEvent('change', { value })}
			on:focus={() => logEvent('focus', value)} />
	</Hst.Variant>
</Hst.Story>
