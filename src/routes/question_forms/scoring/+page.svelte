<script lang="ts">
	import type { ScoringValue, ScoringProperties } from '@surveyplanet/types';
	import { Scoring, type ScoringDefinitions } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let definitions: ScoringDefinitions = $state({
		scoringResetButton: 'Reset',
	});
	let values: ScoringProperties['values'] = $state([1, 2, 3, 4, 5]);
	let labels: ScoringProperties['labels'] = $state([
		'Apple',
		'Orange',
		'Banana',
		'Grapes',
	]);
	let maxLabel: ScoringProperties['maxLabel'] = $state('Yummy');
	let minLabel: ScoringProperties['minLabel'] = $state('Yucky');
	let requireAll: ScoringProperties['requireAll'] = $state(false);
	let requireUnique: ScoringProperties['requireUnique'] = $state(false);
	let response: ScoringValue[] = $state([]);
	const scoringResponseHandler = (event: CustomEvent) => {
		events.push('response');
	};
</script>

<Layout
	component="Scoring"
	example={source(
		id,
		definitions,
		values,
		labels,
		maxLabel,
		minLabel,
		requireAll,
		requireUnique,
		response
	)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id} />
			<PropsChanger
				object="Definitions"
				value={JSON.stringify(definitions)} />
			<PropsChanger
				object="Values"
				value={JSON.stringify(values)} />
			<PropsChanger
				object="Labels"
				value={JSON.stringify(labels)} />
			<PropsChanger
				text="Max Label"
				value={maxLabel} />
			<PropsChanger
				text="Min Label"
				value={minLabel} />
			<PropsChanger
				text="Require All"
				value={requireAll} />
			<PropsChanger
				text="Require Unique"
				value={requireUnique} />
			<PropsChanger
				object="Response"
				value={JSON.stringify(response)} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Scoring
			{id}
			{definitions}
			{values}
			{labels}
			{maxLabel}
			{minLabel}
			{requireAll}
			{requireUnique}
			{response}
			on:response={scoringResponseHandler} />
	</svelte:fragment>
</Layout>
