<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import type { EssayProperties, EssayValue } from '@surveyplanet/types';
	import { Essay } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let id = 'abc123';
	let min: EssayProperties['min'] = 1;
	let max: EssayProperties['max'] = 10;
	let single: EssayProperties['single'] = false;
	let response: EssayValue[] = [];
	const essayResponseHandler = (event: CustomEvent) => {
		logEvent(event.type, event.detail[0]);
	};
</script>

<Hst.Story title="Question forms / Essay">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		{#if min !== null && max !== null}
			<Hst.Number
				bind:value={min}
				title="Min" />
			<Hst.Number
				bind:value={max}
				title="Max" />
		{/if}
		<Hst.Checkbox
			bind:value={single}
			title="Single line" />
		<Hst.Text
			bind:value={response[0]}
			title="Value" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(id, min, max, response)}>
		<div class="wrapper">
			<Essay
				{id}
				{min}
				{max}
				{single}
				{response}
				on:response={essayResponseHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
