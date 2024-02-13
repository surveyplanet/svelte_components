<script lang="ts">
	import { Radio } from '$lib';

	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let id = 'radio';
	let events = $state<string[]>([]);
	let name = $state('stooge');
	let label = $state('Harry');
	let labelTwo = $state('Larry');
	let labelThree = $state('Moe');
	let disabled = $state(false);
	let prependLabel = $state(false);
	let size: 'small' | 'medium' | 'large' = $state('small');

	const onRadioChange = (): void => {
		events.push('change');
	};
</script>

<Layout
	component="Radio"
	example={source({ id, name, label, disabled, prependLabel, size })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Name"
			bind:value={name} />
		<PropsChanger
			label="Label One"
			bind:value={label} />
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
				id={label.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={label}
				{label}
				{prependLabel}
				{size}
				{onRadioChange} />
			<Radio
				id={labelTwo.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelTwo}
				label={labelTwo}
				{prependLabel}
				{size}
				{onRadioChange} />
			<Radio
				id={labelThree.toLowerCase().replace(' ', '-')}
				{disabled}
				{name}
				value={labelThree}
				label={labelThree}
				{prependLabel}
				{size}
				{onRadioChange} />
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
