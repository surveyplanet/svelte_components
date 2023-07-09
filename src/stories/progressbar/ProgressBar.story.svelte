<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { ProgressBar } from '../../lib/index';

	export let Hst: Histoire;

	let max = 100;
	let value = 0;
</script>

<Hst.Story title="ProgressBar">
	<svelte:fragment slot="controls">
		<Hst.Number
			bind:value={max}
			title="Max Value" />
		<Hst.Number
			bind:value
			title="Value" />
	</svelte:fragment>

	<Hst.Variant title="ProgressBar">
		<ProgressBar
			{max}
			{value} />
	</Hst.Variant>
</Hst.Story>
