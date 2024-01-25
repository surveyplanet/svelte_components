<script lang="ts">
	import { Radio } from '$lib';

	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let name = $state('stooge');
	let labelOne = $state('Harry');
	let labelTwo = $state('Larry');
	let labelThree = $state('Moe');
	let disabled = $state(false);
	let prependLabel = $state(false);
	let size: 'small' | 'medium' | 'large' = $state('small');

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
	<svelte:fragment slot="controls">
		doesn't work for text changes
		<PropsContainer>
			<PropsChanger
				text="Name"
				value={name}
				oninput={(e: Event) => {
					name = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Label One"
				value={labelOne}
				oninput={(e: Event) => {
					labelOne = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Label Two"
				value={labelTwo}
				oninput={(e: Event) => {
					labelTwo = (e.target as HTMLInputElement).value;
					console.log(labelTwo);
				}} />
			<PropsChanger
				text="Label Three"
				value={labelThree}
				oninput={(e: Event) => {
					labelThree = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				boolean="Disabled"
				value={disabled}
				oninput={(e: Event) => {
					disabled = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="Prepend Label"
				value={prependLabel}
				oninput={(e: Event) => {
					prependLabel = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				select="Size"
				selectOptions={['small', 'medium', 'large']}
				value={size}
				oninput={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	</svelte:fragment>
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
