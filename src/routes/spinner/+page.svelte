<script lang="ts">
	import { Spinner } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

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
	<svelte:fragment slot="main">
		<PropsContainer>
			<PropsChanger
				text="label"
				value={label}
				textInputHandler={(e: Event) => {
					label = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				number="step"
				value={step}
				numberInputHandler={(e: Event) => {
					step = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				number="min"
				value={min}
				numberInputHandler={(e: Event) => {
					min = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				number="max"
				value={max}
				numberInputHandler={(e: Event) => {
					max = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				number="value"
				{value}
				numberInputHandler={(e: Event) => {
					value = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				boolean="disabled"
				value={disabled}
				booleanInputHandler={(e: Event) => {
					disabled = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="required"
				value={required}
				booleanInputHandler={(e: Event) => {
					required = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="overflow"
				value={overflow}
				booleanInputHandler={(e: Event) => {
					overflow = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				text="id"
				value={id}
				textInputHandler={(e: Event) => {
					id = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="placeholder"
				value={placeholder}
				textInputHandler={(e: Event) => {
					placeholder = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				number="dragSpeed"
				value={dragSpeed}
				numberInputHandler={(e: Event) => {
					dragSpeed = Number((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="size"
				value={size}
				textInputHandler={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
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
	</svelte:fragment>
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
