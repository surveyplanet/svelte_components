<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { ProgressBar, Button } from '$lib/index';

	export let Hst: Histoire;

	let speed = 1000;
	let max = 100;
	let value = 0;
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
	</svelte:fragment>

	<Hst.Variant title="ProgressBar">
		<ProgressBar
			{speed}
			{max}
			{value} />
	</Hst.Variant>
</Hst.Story>
