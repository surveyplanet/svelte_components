<script lang="ts">
	import type { EssayProperties, EssayValue } from '@surveyplanet/types';
	import { Essay } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
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
	{#snippet controls()}
		<PropsChanger
			label="ID"
			text
			bind:value={id} />
		<PropsChanger
			label="Min"
			number
			bind:value={min} />
		<PropsChanger
			label="Max"
			number
			bind:value={max} />
		<PropsChanger
			label="Single"
			checkbox
			bind:value={single} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Essay
				{id}
				{min}
				{max}
				{single}
				{response}
				essayResponse={essayResponseHandler} />
		</div>
	{/snippet}
</Layout>
