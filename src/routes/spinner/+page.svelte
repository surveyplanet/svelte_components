<script lang="ts">
	import { Spinner } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<(number | undefined)[]>([]);
	let keys = $state(0);

	let label = $state('Number Spinner');
	let step = $state(1);
	let min = $state(0);
	let max = $state(100);
	let value: number | undefined = $state(undefined);
	let disabled = $state(false);
	let required = $state(false);
	let overflow = $state(false);
	let id = $state((Date.now() + Math.random()).toString(36));
	let placeholder = $state('Please put in the number');
	let dragSpeed = $state(10);
	let size: 'small' | 'medium' | 'large' = $state('small');

	const spinnerEventHandler = (value: number | undefined) => {
		events.push(value);
	};
</script>

<Layout
	component="Spinner"
	example={source(
		label,
		step,
		min,
		max,
		value,
		disabled,
		required,
		overflow,
		id,
		placeholder,
		dragSpeed,
		size
	)}
	{md}
	bind:events>
	{#snippet controls()}
		Events need to be fixed

		<PropsChanger
			label="label"
			bind:value={label} />
		<PropsChanger
			label="step"
			bind:value={step} />
		<PropsChanger
			label="min"
			bind:value={min} />
		<PropsChanger
			label="max"
			bind:value={max} />
		<PropsChanger
			label="value"
			number
			bind:value />
		<PropsChanger
			label="disabled"
			bind:value={disabled} />
		<PropsChanger
			label="required"
			bind:value={required} />
		<PropsChanger
			label="overflow"
			bind:value={overflow} />
		<PropsChanger
			label="id"
			bind:value={id} />
		<PropsChanger
			label="placeholder"
			bind:value={placeholder} />
		<PropsChanger
			label="dragSpeed"
			bind:value={dragSpeed} />
		<PropsChanger
			label="size"
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		<Spinner
			{label}
			{step}
			{min}
			{max}
			{value}
			{disabled}
			{required}
			{overflow}
			{id}
			{placeholder}
			{dragSpeed}
			{size}
			onChange={spinnerEventHandler} />
	{/snippet}
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
