<script lang="ts">
	import { ComponentEvent, Spinner, type SpinnerProps } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	let events: ComponentEvent<number | undefined, HTMLInputElement>[] = $state(
		[]
	);
	import { default as source } from './example';
	// let keys = $state(0);

	let label: SpinnerProps['label'] = $state('Number Spinner');
	let step: SpinnerProps['step'] = $state(1);
	let min: SpinnerProps['min'] = $state(0);
	let max: SpinnerProps['max'] = $state(100);
	let value: SpinnerProps['value'] = $state(undefined);
	let disabled: SpinnerProps['disabled'] = $state(false);
	let required: SpinnerProps['required'] = $state(false);
	let overflow: SpinnerProps['overflow'] = $state(false);

	let placeholder: SpinnerProps['placeholder'] = $state(
		'Please put in the number'
	);
	let dragSpeed: SpinnerProps['dragSpeed'] = $state(10);
	let size: SpinnerProps['size'] = $state('small');

	const onSpinnerChange = (
		event: ComponentEvent<number | undefined, HTMLInputElement>
	) => {
		events.push(event);
	};

	const onSpinnerUpdate = (
		event: ComponentEvent<number | undefined, HTMLInputElement>
	) => {
		events.push(event);
	};

	const onSpinnerInput = (
		event: ComponentEvent<number | undefined, HTMLInputElement>
	) => {
		events.push(event);
	};

	const onSpinnerBlur = (
		event: ComponentEvent<undefined, HTMLInputElement>
	) => {
		events.push(event);
	};

	const onSpinnerFocus = (
		event: ComponentEvent<undefined, HTMLInputElement>
	) => {
		events.push(event);
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
			type="number"
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
