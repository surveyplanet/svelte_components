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
	let value: string = $state('');
	let label = $state('Text input');
	let placeholder = $state('Placeholder');
	let multiline = $state(false);
	let readonly = $state(false);
	let disabled = $state(false);
	let cleaveOptions = $state({});
	let validationRules: string[] = $state([]);
	let validationMessage: string = $state('');
	let size: 'small' | 'medium' | 'large' = $state('small');

	const changeHandler = (e: Event): void => {
		events.push('change');
	};

	const focusHandler = (event: Event) => {
		events.push('focus');
	};

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
	{#snippet controls()}
		Events need to be fixed
		<PropsContainer>
			<PropsChanger
				text="id"
				value={id}
				oninput={(e: Event) => {
					id = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="name"
				value={name}
				oninput={(e: Event) => {
					name = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="type"
				value={type}
				oninput={(e: Event) => {
					type = (e.target as HTMLSelectElement).value as TextInputType;
				}} />
			<PropsChanger
				text="value"
				{value}
				oninput={(e: Event) => {
					value = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="label"
				value={label}
				oninput={(e: Event) => {
					label = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="placeholder"
				value={placeholder}
				oninput={(e: Event) => {
					placeholder = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				boolean="multiline"
				value={multiline}
				oninput={(e: Event) => {
					multiline = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="readonly"
				value={readonly}
				oninput={(e: Event) => {
					readonly = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				boolean="disabled"
				value={disabled}
				oninput={(e: Event) => {
					disabled = (e.target as HTMLInputElement).checked;
				}} />
			<PropsChanger
				object="cleaveOptions"
				value={JSON.stringify(cleaveOptions)}
				oninput={(e: Event) => {
					cleaveOptions = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				object="validationRules"
				value={JSON.stringify(validationRules)}
				oninput={(e: Event) => {
					validationRules = JSON.parse((e.target as HTMLInputElement).value);
				}} />
			<PropsChanger
				text="validationMessage"
				value={validationMessage}
				oninput={(e: Event) => {
					validationMessage = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				select="size"
				selectOptions={['small', 'medium', 'large']}
				value={size}
				oninput={(e: Event) => {
					size = (e.target as HTMLSelectElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
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
			onchange={changeHandler}
			onfocus={focusHandler}
			onkeydown={keydownHandler}
			onkeyup={keyupHandler} />
	{/snippet}
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
