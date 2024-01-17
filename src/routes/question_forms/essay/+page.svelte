<script lang="ts">
	import type { EssayProperties, EssayValue } from '@surveyplanet/types';
	import { Essay } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let min: EssayProperties['min'] = $state(1);
	let max: EssayProperties['max'] = $state(10);
	let single: EssayProperties['single'] = $state(false);
	let response: EssayValue[] = $state([]);
	const essayResponseHandler = (event: CustomEvent) => {
		events.push('response');
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
				value={id} />
			<PropsChanger
				number="Min"
				value={min} />
			<PropsChanger
				number="Max"
				value={max} />
			<PropsChanger
				text="Single"
				value={single} />
			<PropsChanger
				object="Response"
				value={response.toString()} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<Essay
				{id}
				{min}
				{max}
				{single}
				{response} />
		</div>
	</svelte:fragment>
</Layout>
