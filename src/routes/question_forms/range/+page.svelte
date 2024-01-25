<script lang="ts">
	import type { RangeValue, RangeProperties } from '@surveyplanet/types';
	import { Range } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	// Component props
	let id = $state('abc123');
	let min: RangeProperties['min'] = $state(0);
	let max: RangeProperties['max'] = $state(10);
	let response: RangeValue[] = $state([]);
	const rangeResponseHandler = (response: RangeValue[]) => {
		events.push(JSON.stringify(response));
	};
</script>

<Layout
	component="Range"
	example={source(id, min, max, response)}
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
				number="Min"
				value={min}
				oninput={(e: Event) => {
						min = parseInt((e.target as HTMLInputElement).value);
					}} />
			<PropsChanger
				number="Max"
				value={max}
				oninput={(e: Event) => {
						max = parseInt((e.target as HTMLInputElement).value);
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
		<div class="wrapper">
			<Range
				{id}
				{min}
				{max}
				{response}
				rangeResponse={rangeResponseHandler} />
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
