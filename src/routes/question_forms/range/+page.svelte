<script lang="ts">
	import type { RangeValue, RangeProperties } from '@surveyplanet/types';
	import { ComponentEvent, Range } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<RangeValue[], null>[]>([]);
	// let keys = $state(0);

	// Component props
	let min: RangeProperties['min'] = $state(0);
	let max: RangeProperties['max'] = $state(10);
	let response: RangeValue[] = $state([]);
	const rangeResponseHandler = (
		event: ComponentEvent<RangeValue[], null>
	) => {
		events.push(event);
	};
</script>

<Layout
	component="Range"
	example={source({ min, max, response })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Min"
			bind:value={min} />
		<PropsChanger
			label="Max"
			bind:value={max} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<Range
				{min}
				{max}
				{response}
				onRangeResponse={rangeResponseHandler} />
		</div>
	{/snippet}
</Layout>

<style>
	.wrapper {
		display: block;
		width: 500px;
		height: 100px;
		padding: 20px;
	}
</style>
