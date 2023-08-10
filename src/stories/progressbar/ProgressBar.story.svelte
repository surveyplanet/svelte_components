<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { ProgressBar, Button } from '$lib/index';
	import { default as source } from './source';

	export let Hst: Histoire;

	let speed = 1000;
	let max = 100;
	let value = 0;
	let displayValue = true;
</script>

<Hst.Story title="Progress Bar">
	<svelte:fragment slot="controls">
		<Hst.Number
			bind:value={max}
			title="Max Value" />
		<Hst.Number
			bind:value
			title="Value" />
		<Hst.Number
			bind:value={speed}
			title="Speed (ms)" />
		<Hst.Checkbox
			bind:value={displayValue}
			title="Display Value" />
	</svelte:fragment>

	<Hst.Variant
		title="ProgressBar"
		source={source(speed, max, value)}>
		<ProgressBar
			{speed}
			{max}
			{value}
			{displayValue} />
	</Hst.Variant>
</Hst.Story>
