<script lang="ts">
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import type { ScoringValue, ScoringProperties } from '@surveyplanet/types';
	import { Scoring, type ScoringDefinitions } from '$lib';
	import { logEvent } from 'histoire/client';
	import { default as source } from './source';
	export let Hst: Histoire;
	// Component props
	let id: string = 'abc123';
	let definitions: ScoringDefinitions = {
		scoringResetButton: 'Reset',
	};
	let values: ScoringProperties['values'] = [1, 2, 3, 4, 5];
	let labels: ScoringProperties['labels'] = [
		'Apple',
		'Orange',
		'Banana',
		'Grapes',
	];
	let maxLabel: ScoringProperties['maxLabel'] = 'Yummy';
	let minLabel: ScoringProperties['minLabel'] = 'Yucky';
	let requireAll: ScoringProperties['requireAll'] = false;
	let requireUnique: ScoringProperties['requireUnique'] = false;
	let response: ScoringValue[] = [];
	const scoringResponseHandler = (event: CustomEvent) => {
		logEvent(event.type, event.detail);
	};
</script>

<Hst.Story title="Question forms / Scoring">
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={id}
			title="Id" />
		<Hst.Json
			bind:value={definitions}
			title="Definitions" />
		<Hst.Json
			bind:value={values}
			title="Values" />
		<Hst.Json
			bind:value={labels}
			title="Labels" />
		<Hst.Text
			bind:value={maxLabel}
			title="Max Label" />
		<Hst.Text
			bind:value={minLabel}
			title="Min Label" />
		<Hst.Checkbox
			bind:value={requireAll}
			title="Require All" />
		<Hst.Checkbox
			bind:value={requireUnique}
			title="Require Unique" />
		<Hst.Json
			bind:value={response}
			title="Response" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		source={source(
			id,
			definitions,
			values,
			labels,
			maxLabel,
			minLabel,
			requireAll,
			requireUnique,
			response
		)}>
		<div class="wrapper">
			<Scoring
				on:response={scoringResponseHandler}
				{id}
				{definitions}
				{values}
				{labels}
				{maxLabel}
				{minLabel}
				{requireAll}
				{requireUnique}
				{response} />
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss"></style>
