<script lang="ts">
	import { TextInput, type ComponentEvent, type TextInputProps } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import source from './example';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<string | undefined, HTMLInputElement>[]>(
		[]
	);

	// let keys = $state(0);

	let id: TextInputProps['id'] = $state('basic-text');
	let name: TextInputProps['name'] = $state('basic-text');
	let type: TextInputProps['type'] = $state('text');
	let value: TextInputProps['value'] = $state('');
	let label: TextInputProps['label'] = $state('Text input');
	let placeholder: TextInputProps['placeholder'] = $state('Placeholder');
	let readonly: TextInputProps['readonly'] = $state(false);
	let disabled: TextInputProps['disabled'] = $state(false);
	let cleaveOptions: TextInputProps['cleaveOptions'] = $state({});
	let validationRules: TextInputProps['validationRules'] = $state([]);
	let validationMessage: TextInputProps['validationMessage'] = $state('');
	let size: TextInputProps['size'] = $state('small');

	const onTextInputChange = (
		event: ComponentEvent<string, HTMLInputElement>
	): void => {
		events.push(event);
	};

	const onTextInputInput = (
		event: ComponentEvent<string, HTMLInputElement>
	): void => {
		events.push(event);
	};

	const onTextInputKeydown = (
		event: ComponentEvent<string, HTMLInputElement>
	) => {
		events.push(event);
	};

	const onTextInputKeyup = (
		event: ComponentEvent<string, HTMLInputElement>
	) => {
		events.push(event);
	};

	const onTextInputBlur = (
		event: ComponentEvent<undefined, HTMLInputElement>
	): void => {
		events.push(event);
	};

	const onTextInputFocus = (
		event: ComponentEvent<undefined, HTMLInputElement>
	) => {
		events.push(event);
	};
</script>

<Layout
	component="TextInput"
	example={source({
		id,
		name,
		type,
		value,
		label,
		placeholder,
		readonly,
		disabled,
		cleaveOptions,
		validationRules,
		validationMessage,
		size,
	})}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Id"
			bind:value={id} />
		<PropsChanger
			label="Name"
			bind:value={name} />
		<PropsChanger
			label="Type"
			selectOptions={[
				'password',
				'search',
				'text',
				'date',
				'time',
				'datetime-local',
				'multiline',
			]}
			bind:value={type} />
		<PropsChanger
			label="Value"
			bind:value />
		<PropsChanger
			label="Label"
			bind:value={label} />
		<PropsChanger
			label="Placeholder"
			bind:value={placeholder} />
		<PropsChanger
			label="Readonly"
			bind:value={readonly} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Cleave Options"
			bind:value={cleaveOptions} />
		<PropsChanger
			label="Validation Rules"
			bind:value={validationRules} />
		<PropsChanger
			label="Validation Message"
			bind:value={validationMessage} />
		<PropsChanger
			label="Size"
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		<TextInput
			{id}
			{name}
			{type}
			bind:value
			{label}
			{placeholder}
			{readonly}
			{disabled}
			{cleaveOptions}
			{validationRules}
			{validationMessage}
			{size}
			{onTextInputChange}
			{onTextInputFocus}
			{onTextInputKeydown}
			{onTextInputKeyup}
			{onTextInputBlur}
			{onTextInputInput} />
	{/snippet}
</Layout>

<style>
	.wrapper {
		padding: 1rem;
		margin: 1rem;
	}
</style>
