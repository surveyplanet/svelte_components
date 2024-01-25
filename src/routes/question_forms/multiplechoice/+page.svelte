<script lang="ts">
	import type {
		MultipleChoiceValue,
		MultipleChoiceProperties,
	} from '@surveyplanet/types';
	import { MultipleChoice } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as MultipleChoice['value'][];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let labels: MultipleChoiceProperties['labels'] = $state([
		'Harry',
		'Larry',
		'Moe',
	]);
	let multi: MultipleChoiceProperties['multi'] = $state(false);
	let layout: MultipleChoiceProperties['layout'] = $state('1');
	let random: MultipleChoiceProperties['random'] = $state(false);
	let min: MultipleChoiceProperties['min'] = $state(null);
	let max: MultipleChoiceProperties['max'] = $state(null);
	let response: MultipleChoiceValue[] = $state([]);
	let other: MultipleChoiceProperties['other'] = $state(undefined);
	const multipleChoiceResponseHandler = (event: MultipleChoiceValue[]) => {
		events.push(event);
	};
</script>

<Layout
	component="MultipleChoice"
	example={source(id, labels, multi, layout, random, min, max, response)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="ID"
				value={id}
				oninput={(e: Event) => {
						id = (e.target as HTMLInputElement).value;
					}} />
			<PropsChanger
				object="Labels"
				value={JSON.stringify(labels)}
				oninput={(e: Event) => {
						labels = JSON.parse((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				boolean="Multi"
				value={multi}
				oninput={(e: Event) => {
						multi = (e.target as HTMLInputElement).checked;
					}} />
			<PropsChanger
				select="Layout"
				selectOptions={['1', '2', '3', '4', 'dropdown']}
				value={layout}
				oninput={(e: Event) => {
						layout = ((e.target as HTMLInputElement).value) as MultipleChoiceProperties['layout'];
					}} />
			<PropsChanger
				boolean="Random"
				value={random}
				oninput={(e: Event) => {
						random = (e.target as HTMLInputElement).checked;
					}} />

			<PropsChanger
				object="Response"
				value={JSON.stringify(response)}
				oninput={(e: Event) => {
						response = JSON.parse((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				text="Other"
				value={other}
				oninput={(e: Event) => {
						other = (e.target as HTMLInputElement).value;
					}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<MultipleChoice
			{id}
			{labels}
			{multi}
			{layout}
			{random}
			{response}
			{other}
			multipleChoiceResponse={multipleChoiceResponseHandler} />
	</svelte:fragment>
</Layout>
