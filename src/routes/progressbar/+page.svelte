<script lang="ts">
	import { ProgressBar } from '$lib/index';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let speed = 1000;
	let max = 100;
	let value = 0;
	let displayValue = true;
</script>

<Layout
	component="ProgressBar"
	example={source(speed, max, value, displayValue)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Speed"
				value={speed.toString()}
				textInputHandler={(e: Event) => {
					speed = parseInt((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="Max"
				value={max.toString()}
				textInputHandler={(e: Event) => {
					max = parseInt((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="Value"
				value={value.toString()}
				textInputHandler={(e: Event) => {
					value = parseInt((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="Display Value"
				value={displayValue.toString()}
				textInputHandler={(e: Event) => {
					displayValue = (e.target as HTMLInputElement).value === 'true';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<ProgressBar
			{speed}
			{max}
			{value}
			{displayValue} />
	</svelte:fragment>
</Layout>
