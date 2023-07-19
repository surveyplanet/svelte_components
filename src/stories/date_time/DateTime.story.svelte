<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { DateTime } from '$lib';
	import { logEvent } from 'histoire/client';
	// import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let definitions: DateTimeDefinitions;
	let date: DateTimeProperties['date'] = false;
	let time: DateTimeProperties['time'] = false;
	let questionId: string;
	const someHandler = (event: CustomEvent) => {
		value = event.detail;
		logEvent('change', event.detail);
	};
</script>

<Hst.Story title="Date Time">
	<svelte:fragment slot="controls">
		// Component controls
		<Hst.Json
			bind:value={definitions}
			title="Definitions" />
		<Hst.Json
			bind:value={date}
			title="Date" />
		<Hst.Json
			bind:value={time}
			title="Time" />
		<Hst.Text
			bind:value={questionId}
			title="Question Id" />
	</svelte:fragment>

	<Hst.Variant title="Primary">
		<div class="wrapper">
			// Component markup
			<DateTime
				{definitions}
				{date}
				{time}
				{questionId} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
