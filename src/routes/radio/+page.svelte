<script lang="ts">
	import { Radio } from '$lib';

	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let id = 'radio';
	let events = $state<string[]>([]);
	let name = $state('stooge');
	let labelOne = $state('Harry');
	let labelTwo = $state('Larry');
	let labelThree = $state('Moe');
	let disabled = $state(false);
	let prependLabel = $state(false);
	let size: 'small' | 'medium' | 'large' = $state('small');

	const changeEventHandler = (): void => {
		events.push('change');
	};
</script>

<Layout
	component="Radio"
	example={source(id, name, labelOne, disabled, prependLabel, size)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Name"
			bind:value={name} />
		<PropsChanger
			label="Label One"
			bind:value={labelOne} />
		<PropsChanger
			label="Label Two"
			bind:value={labelTwo} />
		<PropsChanger
			label="Label Three"
			bind:value={labelThree} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Prepend Label"
			bind:value={prependLabel} />
		<PropsChanger
			label="Size"
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
				onChange={changeEventHandler} />
			<Radio
				id={labelTwo.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelTwo}
				label={labelTwo}
				{prependLabel}
				{size}
				onChange={changeEventHandler} />
			<Radio
				id={labelThree.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelThree}
				label={labelThree}
				{prependLabel}
				{size}
				onChange={changeEventHandler} />
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
