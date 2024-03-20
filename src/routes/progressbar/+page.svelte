<script lang="ts">
	import { ProgressBar, type ProgressBarProps } from '$lib/index';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let speed: ProgressBarProps['speed'] = $state(1000);
	let max: ProgressBarProps['max'] = $state(100);
	let value: ProgressBar['value'] = $state(0);
	let displayValue: ProgressBar['displayValue'] = $state(true);
</script>

<Layout
	component="ProgressBar"
	example={source({ speed, max, value, displayValue })}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Speed"
			bind:value={speed} />
		<PropsChanger
			label="Max"
			bind:value={max} />
		<PropsChanger
			label="Value"
			bind:value />
		<PropsChanger
			label="Display Value"
			bind:value={displayValue} />
	{/snippet}
	{#snippet main()}
		<!-- <div class="wrapper"> -->
		<ProgressBar
			{speed}
			{max}
			{value}
			{displayValue} />
		<!-- </div> -->
	{/snippet}
</Layout>

<style lang="scss">
	.wrapper {
		width: 100%;
		padding: 20px;
		height: 50px;
		background-color: whitesmoke;
	}
</style>
