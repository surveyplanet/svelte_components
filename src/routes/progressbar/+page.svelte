<script lang="ts">
	import { ProgressBar } from '$lib/index';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let speed = $state(1000);
	let max = $state(100);
	let value = $state(20);
	let displayValue = $state(true);
</script>

<Layout
	component="ProgressBar"
	example={source(speed, max, value, displayValue)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Speed"
			number
			bind:value={speed} />
		<PropsChanger
			label="Max"
			number
			bind:value={max} />
		<PropsChanger
			label="Value"
			number
			bind:value />
		<PropsChanger
			label="Display Value"
			checkbox
			bind:value={displayValue} />
	{/snippet}
	{#snippet main()}
		<div class="wrapper">
			<ProgressBar
				{speed}
				{max}
				{value}
				{displayValue} />
		</div>
	{/snippet}
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
