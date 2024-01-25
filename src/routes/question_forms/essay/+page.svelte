<script lang="ts">
	import type { EssayProperties, EssayValue } from '@surveyplanet/types';
	import { Essay } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as EssayValue[];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let min: EssayProperties['min'] = $state(1);
	let max: EssayProperties['max'] = $state(10);
	let single: EssayProperties['single'] = $state(false);
	let response: EssayValue[] = $state([]);
	const essayResponseHandler = (response: EssayValue[]) => {
		events.push(response.toString());
	};
</script>

<Layout
	component="Essay"
	example={source(id, min, max, single, response)}
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
				number="Min"
				value={min}
				oninput={(e: Event) => {
						min = Number((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				number="Max"
				value={max}
				oninput={(e: Event) => {
						max = Number((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				boolean="Single"
				value={single}
				oninput={(e: Event) => {
						single = (e.target as HTMLInputElement).checked;
					}} />
			<PropsChanger
				object="Response"
				value={response.toString()}
				oninput={(e: Event) => {
						response = (e.target as HTMLInputElement).value.split(',');
					}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<Essay
				{id}
				{min}
				{max}
				{single}
				{response}
				essayResponse={essayResponseHandler} />
		</div>
	</svelte:fragment>
</Layout>
