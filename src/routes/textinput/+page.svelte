<script lang="ts">
	import { TextInput, type TextInputType } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let keys = $state(0);

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

	let cleaveOptionsStringed = $state(JSON.stringify(cleaveOptions));
	let validationRulesStringed = $state(JSON.stringify(validationRules));

	$effect(() => {
		cleaveOptions = JSON.parse(cleaveOptionsStringed);
		validationRules = JSON.parse(validationRulesStringed);
	});
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
		readonly,
		disabled,
		cleaveOptions,
		validationRules,
		validationMessage,
		size
	)}
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
			bind:value={cleaveOptionsStringed} />
		<PropsChanger
			label="Validation Rules"
			bind:value={validationRulesStringed} />
		<PropsChanger
			label="Validation Message"
			bind:value={validationMessage} />
		<PropsChanger
			label="size"
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
	{/snippet}
	{#snippet main()}
		<TextInput
			{id}
			{name}
			{type}
			{value}
			{label}
			{placeholder}
			{readonly}
			{disabled}
			{cleaveOptions}
			{validationRules}
			{validationMessage}
			{size}
			onChange={changeHandler}
			onFocus={focusHandler}
			onKeydown={keydownHandler}
			onKeyup={keyupHandler} />
	{/snippet}
</Layout>

<style>
	.wrapper {
		padding: 1rem;
		margin: 1rem;
	}
</style>
