<script lang="ts">
	import { Radio } from '$lib';

	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let name = 'stooge';
	let labelOne = 'Harry';
	let labelTwo = 'Larry';
	let labelThree = 'Moe';
	let disabled = false;
	let prependLabel = false;
	let size: 'small' | 'medium' | 'large' = 'small';

	const changeEventHandler = (e: Event): void => {
		events.push('change');
	};
</script>

<Layout
	component="Radio"
	example={source(
		name,
		labelOne,
		labelTwo,
		labelThree,
		disabled,
		prependLabel,
		size
	)}
	{md}
	{events}>
	<svelte:fragment slot="main">
		<div id="wrapper">
			<Radio
				id={labelOne.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelOne}
				label={labelOne}
				{prependLabel}
				{size}
				on:change={changeEventHandler} />
			<Radio
				id={labelTwo.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelTwo}
				label={labelTwo}
				{prependLabel}
				{size}
				on:change={changeEventHandler} />
			<Radio
				id={labelThree.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelThree}
				label={labelThree}
				{prependLabel}
				{size}
				on:change={changeEventHandler} />
		</div>
	</svelte:fragment>
</Layout>

<style>
	#wrapper {
		display: flex;
		gap: 24px;
		padding: 24px;
	}
</style>
