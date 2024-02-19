<script lang="ts">
	import { TextInput, type TextInputType, type ComponentEvent } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import source from './example';
	import md from './docs.md?raw';
	let events = $state<ComponentEvent<string | undefined>[]>([]);

	// let keys = $state(0);

	let id = $state('basic-text');
	let name = $state('basic-text');
	let type: TextInputType = $state('text');
	let value: string = $state('');
	let label = $state('Text input');
	let placeholder = $state('Placeholder');
	let readonly = $state(false);
	let disabled = $state(false);
	let cleaveOptions = $state({});
	let validationRules: string[] = $state([]);
	let validationMessage: string = $state('');
	let size: 'small' | 'medium' | 'large' = $state('small');

	const onTextInputChange = (event: ComponentEvent<string>): void => {
		events.push(event);
	};

	const onTextInputInput = (event: ComponentEvent<string>): void => {
		events.push(event);
	};

	const onTextInputKeydown = (event: ComponentEvent<string>) => {
		events.push(event);
	};

	const onTextInputKeyup = (event: ComponentEvent<string>) => {
		events.push(event);
	};

	const onTextInputBlur = (event: ComponentEvent<undefined>): void => {
		events.push(event);
	};

	const onTextInputFocus = (event: ComponentEvent<undefined>) => {
		events.push(event);
	};

	// let cleaveOptionsStringed = $state(JSON.stringify(cleaveOptions));
	// let validationRulesStringed = $state(JSON.stringify(validationRules));

	// $effect(() => {
	// 	cleaveOptions = JSON.parse(cleaveOptionsStringed);
	// 	validationRules = JSON.parse(validationRulesStringed);
	// });
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
		<!-- <PropsChanger
			label="Cleave Options"
			bind:value={cleaveOptionsStringed} />
		<PropsChanger
			label="Validation Rules"
			bind:value={validationRulesStringed} /> -->
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
