<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import type { EssayProperties, EssayValue } from '@surveyplanet/types';
	import { Essay } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;

	// Component props
	let id: string = 'abc123';
	let min: EssayProperties['min'] = 1;
	let max: EssayProperties['max'] = 10;
	let single: EssayProperties['single'] = false;
	let response: EssayValue[] = [];
	const essayInputHandler = (event: CustomEvent) => {
		logEvent('change', event.detail[0]);
	};
</script>

<Hst.Story title="Question forms / Essay">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Number
			bind:value={min}
			title="Min" />
		<Hst.Number
			bind:value={max}
			title="Max" />
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
				on:input={essayInputHandler} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
