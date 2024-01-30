<script lang="ts">
	import { Spinner } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
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

	const spinnerEventHandler = (e: CustomEvent) => {
		events.push(e.detail);
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
	{events}>
	{#snippet controls()}
		Events need to be fixed

		<PropsChanger
			text="label"
			value={label}
			oninput={(e: Event) => {
					label = (e.target as HTMLInputElement).value;
				}} />
		<PropsChanger
			number="step"
			value={step}
			oninput={(e: Event) => {
					step = Number((e.target as HTMLInputElement).value);
				}} />
		<PropsChanger
			number="min"
			value={min}
			oninput={(e: Event) => {
					min = Number((e.target as HTMLInputElement).value);
				}} />
		<PropsChanger
			number="max"
			value={max}
			oninput={(e: Event) => {
					max = Number((e.target as HTMLInputElement).value);
				}} />
		<PropsChanger
			number="value"
			{value}
			oninput={(e: Event) => {
					value = Number((e.target as HTMLInputElement).value);
				}} />
		<PropsChanger
			boolean="disabled"
			value={disabled}
			oninput={(e: Event) => {
					disabled = (e.target as HTMLInputElement).checked;
				}} />
		<PropsChanger
			boolean="required"
			value={required}
			oninput={(e: Event) => {
					required = (e.target as HTMLInputElement).checked;
				}} />
		<PropsChanger
			boolean="overflow"
			value={overflow}
			oninput={(e: Event) => {
					overflow = (e.target as HTMLInputElement).checked;
				}} />
		<PropsChanger
			text="id"
			value={id}
			oninput={(e: Event) => {
					id = (e.target as HTMLInputElement).value;
				}} />
		<PropsChanger
			text="placeholder"
			value={placeholder}
			oninput={(e: Event) => {
					placeholder = (e.target as HTMLInputElement).value;
				}} />
		<PropsChanger
			number="dragSpeed"
			value={dragSpeed}
			oninput={(e: Event) => {
					dragSpeed = Number((e.target as HTMLInputElement).value);
				}} />
		<PropsChanger
			text="size"
			value={size}
			oninput={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
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
			on:change={spinnerEventHandler} />
	{/snippet}
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
