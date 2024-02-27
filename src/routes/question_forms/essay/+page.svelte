<script lang="ts">
	import type { EssayProperties, EssayValue } from '@surveyplanet/types';
	import { ComponentEvent, Essay } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<EssayValue[], HTMLInputElement>[]>([]);
	// let keys = $state(0);

	// Component props
	let min: EssayProperties['min'] = $state(1);
	let max: EssayProperties['max'] = $state(10);
	let single: EssayProperties['single'] = $state(false);
	let response: EssayValue[] = $state([]);
	const essayResponseHandler = (
		event: ComponentEvent<EssayValue[], HTMLInputElement>
	) => {
		events.push(event);
	};
</script>

<Layout
	component="Essay"
	example={source({ min, max, single, response })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Min"
			bind:value={min} />
		<PropsChanger
			label="Max"
			bind:value={max} />
		<PropsChanger
			label="Single"
			bind:value={single} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Essay
				{min}
				{max}
				{single}
				{response}
				onEssayResponse={essayResponseHandler} />
		</div>
	{/snippet}
</Layout>
