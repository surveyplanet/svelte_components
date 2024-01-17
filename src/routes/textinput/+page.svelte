<script lang="ts">
	import { TextInput, type TextInputType } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];
	let keys = $state(0);

	let id = $state('basic-text');
	let name = $state('basic-text');
	let type: TextInputType = $state('text');
	let value: string | undefined = $state();
	let label = $state('Text input');
	let placeholder = $state('Placeholder');
	let multiline = $state(false);
	let readonly = $state(false);
	let disabled = $state(false);
	let cleaveOptions = $state({});
	let validationRules: string[] = $state([]);
	let validationMessage: string | undefined = $state();
	let size: 'small' | 'medium' | 'large' = $state('small');

	const changeHandler = (e: Event): void => {
		events.push('change');
	};

	const focusHandler = (event: Event) => {
		events.push('focus');
	};

	// ignore blur events
	// const blurHandler = (event: Event) => {
	// 	logEvent('blur', event);
	// };

	const keydownHandler = (event: Event) => {
		events.push('keydown');
	};

	const keyupHandler = (event: Event) => {
		events.push('keyup');
	};
</script>

<Layout
	component="TextInput"
	example={source(
		id,
		name,
		type,
		value,
		label,
		placeholder,
		multiline,
		readonly,
		disabled,
		cleaveOptions,
		validationRules,
		validationMessage,
		size
	)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="id"
				value={id}
				textInputHandler={(e: Event) => {
					id = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="name"
				value={name}
				textInputHandler={(e: Event) => {
					name = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="type"
				value={type}
				textInputHandler={(e: Event) => {
					type = (e.target as HTMLSelectElement).value as TextInputType;
				}} />
			<PropsChanger
				text="value"
				{value}
				textInputHandler={(e: Event) => {
					value = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="label"
				value={label}
				textInputHandler={(e: Event) => {
					label = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="placeholder"
				value={placeholder}
				textInputHandler={(e: Event) => {
					placeholder = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				boolean="multiline"
				value={multiline}
				booleanInputHandler={(e: Event) => {
					multiline = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="readonly"
				value={readonly}
				booleanInputHandler={(e: Event) => {
					readonly = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="disabled"
				value={disabled}
				booleanInputHandler={(e: Event) => {
					disabled = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				object="cleaveOptions"
				value={JSON.stringify(cleaveOptions)}
				textInputHandler={(e: Event) => {
					cleaveOptions = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				object="validationRules"
				value={JSON.stringify(validationRules)}
				textInputHandler={(e: Event) => {
					validationRules = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="validationMessage"
				value={validationMessage}
				textInputHandler={(e: Event) => {
					validationMessage = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				number="size"
				value={size}
				numberInputHandler={(e: Event) => {
					size = (e.target as HTMLSelectElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<TextInput
			{id}
			{name}
			{type}
			{value}
			{label}
			{placeholder}
			{multiline}
			{readonly}
			{disabled}
			{cleaveOptions}
			{validationRules}
			{validationMessage}
			{size}
			on:change={changeHandler}
			on:focus={focusHandler}
			on:keydown={keydownHandler}
			on:keyup={keyupHandler} />
	</svelte:fragment>
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
