<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { logEvent } from 'histoire/client';
	// import source from './source';
	import { NumberSpinner } from '../../lib';
	export let Hst: Histoire;

	let step = 1;
	let min = 0;
	let max = 100;
	let value = 0;
</script>

<Hst.Story title="Form controls / NumberSpinner">
	<svelte:fragment slot="controls">
		<!-- <Hst.Number
			label="Value"
			{value}
			min={0}
			max={100}
			step={1} /> -->
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<NumberSpinner
			{step}
			{min}
			{max}
			{value} />
	</Hst.Variant>
</Hst.Story>
