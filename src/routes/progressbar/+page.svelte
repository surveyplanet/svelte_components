<script lang="ts">
	import { ProgressBar } from '$lib/index';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let speed = $state(1000);
	let max = $state(100);
	let value = $state(20);
	let displayValue = $state(true);
</script>

<Layout
	component="ProgressBar"
	example={source(speed, max, value, displayValue)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				number="Speed"
				value={speed.toString()}
				oninput={(e: Event) => {
					speed = parseInt((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				number="Max"
				value={max.toString()}
				oninput={(e: Event) => {
					max = parseInt((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				number="Value"
				value={value.toString()}
				oninput={(e: Event) => {
					value = parseInt((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				boolean="Display Value"
				value={displayValue}
				oninput={(e: Event) => {
					displayValue = (e.target as HTMLInputElement).checked;
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<div class="wrapper">
			<ProgressBar
				{speed}
				{max}
				{value}
				{displayValue} />
		</div>
	</svelte:fragment>
</Layout>

<style lang="scss">
	.wrapper {
		width: 300px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: whitesmoke;
	}
</style>
