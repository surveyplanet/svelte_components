<script lang="ts">
	import type { RangeValue, RangeProperties } from '@surveyplanet/types';
	import { Range } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<RangeValue[][]>([]);
	// let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let min: RangeProperties['min'] = $state(0);
	let max: RangeProperties['max'] = $state(10);
	let response: RangeValue[] = $state([]);
	const rangeResponseHandler = (response: RangeValue[]) => {
		events.push(response);
	};
</script>

<Layout
	component="Range"
	example={source(id, min, max, response)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="ID"
			bind:value={id} />
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
				{id}
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
