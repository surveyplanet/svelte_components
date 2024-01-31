<script lang="ts">
	import { Radio } from '$lib';

	import { Layout, PropsChanger } from '$layout/layout_index';
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
	{#snippet controls()}
		doesn't work for text changes

		<PropsChanger
			label="Name"
			text
			bind:value={name} />
		<PropsChanger
			label="Label One"
			text
			bind:value={labelOne} />
		<PropsChanger
			label="Label Two"
			text
			bind:value={labelTwo} />
		<PropsChanger
			label="Label Three"
			text
			bind:value={labelThree} />
		<PropsChanger
			label="Disabled"
			checkbox
			bind:value={disabled} />
		<PropsChanger
			label="Prepend Label"
			checkbox
			bind:value={prependLabel} />
		<PropsChanger
			label="Size"
			select
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		<div id="wrapper">
			<Radio
				id={labelOne.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelOne}
				label={labelOne}
				{prependLabel}
				{size}
				onchange={changeEventHandler} />
			<Radio
				id={labelTwo.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelTwo}
				label={labelTwo}
				{prependLabel}
				{size}
				onchange={changeEventHandler} />
			<Radio
				id={labelThree.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelThree}
				label={labelThree}
				{prependLabel}
				{size}
				onchange={changeEventHandler} />
		</div>
	{/snippet}
</Layout>

<style>
	#wrapper {
		display: flex;
		gap: 24px;
		padding: 24px;
	}
</style>
