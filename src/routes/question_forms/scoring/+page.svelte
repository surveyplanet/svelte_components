<script lang="ts">
	import type { ScoringValue, ScoringProperties } from '@surveyplanet/types';
	import {
		Scoring,
		type ScoringDefinitions,
		type ComponentEvent,
		type CustomDragEventTarget,
	} from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<
		ComponentEvent<
			ScoringValue[],
			HTMLInputElement | CustomDragEventTarget | HTMLButtonElement
		>[]
	>([]);
	// let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let definitions: ScoringDefinitions = $state({
		scoringResetButton: 'Reset',
	});
	let values: ScoringProperties['values'] = $state([1, 2, 3, 4]);
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
	const scoringResponseHandler = (
		event: ComponentEvent<
			ScoringValue[],
			HTMLInputElement | CustomDragEventTarget | HTMLButtonElement
		>
	) => {
		events.push(event);
	};
</script>

<Layout
	component="Scoring"
	example={source({
		id,
		definitions,
		values,
		labels,
		maxLabel,
		minLabel,
		requireAll,
		requireUnique,
		response,
	})}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			bind:value={id} />
		<PropsChanger
			label="Require All"
			bind:value={requireAll} />
		<PropsChanger
			label="Require Unique"
			bind:value={requireUnique} />
		<PropsChanger
			label="Definitions"
			bind:value={definitions} />
		<PropsChanger
			label="Values"
			bind:value={values} />
		<PropsChanger
			label="Labels"
			bind:value={labels} />
		<PropsChanger
			label="Max Label"
			bind:value={maxLabel} />
		<PropsChanger
			label="Min Label"
			bind:value={minLabel} />
	{/snippet}
	{#snippet main()}
		<Scoring
			{id}
			bind:definitions
			bind:values
			bind:labels
			{maxLabel}
			{minLabel}
			{requireAll}
			{requireUnique}
			{response}
			onScoringResponse={scoringResponseHandler} />
	{/snippet}
</Layout>
