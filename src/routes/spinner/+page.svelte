<script lang="ts">
	import { ComponentEvent, Spinner } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	let events = $state<(number | undefined | string)[]>([]);
	import { default as source } from './example';
	// let keys = $state(0);

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

	const onSpinnerChange = (event: ComponentEvent<number | undefined>) => {
		events.push(event.value);
	};

	const onSpinnerUpdate = (event: ComponentEvent<number | undefined>) => {
		events.push(event.value);
	};

	const onSpinnerInput = (event: ComponentEvent<number | undefined>) => {
		events.push(event.value);
	};

	const onSpinnerBlur = () => {
		events.push('blur');
	};

	const onSpinnerFocus = () => {
		events.push('focus');
	};
</script>

<Layout
	component="Spinner"
	example={source({
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
		size,
	})}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Label"
			bind:value={label} />
		<PropsChanger
			label="Step"
			bind:value={step} />
		<PropsChanger
			label="Min"
			bind:value={min} />
		<PropsChanger
			label="Max"
			bind:value={max} />
		<PropsChanger
			label="Value"
			bind:value />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Required"
			bind:value={required} />
		<PropsChanger
			label="Overflow"
			bind:value={overflow} />
		<PropsChanger
			label="Id"
			bind:value={id} />
		<PropsChanger
			label="Placeholder"
			bind:value={placeholder} />
		<PropsChanger
			label="DragSpeed"
			bind:value={dragSpeed} />
		<PropsChanger
			label="Size"
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
			{onSpinnerChange}
			{onSpinnerUpdate}
			{onSpinnerInput}
			{onSpinnerBlur}
			{onSpinnerFocus} />
	{/snippet}
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
