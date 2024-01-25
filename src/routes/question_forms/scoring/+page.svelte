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
	let values: ScoringProperties['values'] = $state([1, 2, 3, 4]);
	let labels: ScoringProperties['labels'] = $state([
		'Apple',
		'Orange',
		'Banana',
		'Grapes',
	]);
	let maxLabel: ScoringProperties['maxLabel'] = $state('Yummy');
	let minLabel: ScoringProperties['minLabel'] = $state('Yucky');
	let requireAll: ScoringProperties['requireAll'] = $state(true);
	let requireUnique: ScoringProperties['requireUnique'] = $state(true);
	let response: ScoringValue[] = $state([]);
	const scoringResponseHandler = (response: ScoringValue[]) => {
		events.push(JSON.stringify(response));
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
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id}
				oninput={(e: Event) => {
						id = (e.target as HTMLInputElement).value;
					}} />

			<PropsChanger
				object="Definitions"
				value={JSON.stringify(definitions)}
				oninput={(e: Event) => {
						definitions = JSON.parse((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				object="Values"
				value={JSON.stringify(values)}
				oninput={(e: Event) => {
						values = JSON.parse((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				object="Labels"
				value={JSON.stringify(labels)}
				oninput={(e: Event) => {
						labels = JSON.parse((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				text="Max Label"
				value={maxLabel}
				oninput={(e: Event) => {
						maxLabel = (e.target as HTMLInputElement).value;
					}} />
			<PropsChanger
				text="Min Label"
				value={minLabel}
				oninput={(e: Event) => {
						minLabel = (e.target as HTMLInputElement).value;
					}} />
			<PropsChanger
				boolean="Require All"
				value={requireAll}
				oninput={(e: Event) => {
						requireAll = (e.target as HTMLInputElement).checked;
					}} />
			<PropsChanger
				boolean="Require Unique"
				value={requireUnique}
				oninput={(e: Event) => {
						requireUnique = (e.target as HTMLInputElement).checked;
					}} />
			<PropsChanger
				object="Response"
				value={JSON.stringify(response)}
				oninput={(e: Event) => {
						response = JSON.parse((e.target as HTMLInputElement).value);
					}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
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
			scoringResponse={scoringResponseHandler} />
	{/snippet}
</Layout>
