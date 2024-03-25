<script lang="ts">
	import TextInput from '$lib/TextInput.svelte';
	import Toggle from '$lib/Toggle.svelte';
	import type { TextInputProps } from '$lib/TextInput.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import Dropdown from '$lib/Dropdown.svelte';
	import { dasherize } from '@surveyplanet/utilities';
	import JsonEditor from './JsonEditor.svelte';
	import type { ComponentEvent } from '$lib';

	const FORM_CONTROL_SIZE: TextInputProps['size'] = 'medium';

	// type ValueTypes = string | number | boolean | object | undefined ;

	interface PropsChangerProps<T> {
		value: T;
		label: string;
		type?: 'string' | 'number' | 'boolean' | 'json' | 'select';
		selectOptions?: string[] | number[] | { label: string; id: string }[];
		onPropsChangerInput?: () => void;
		onPropsChangerBlur?: () => void;
	}

	let {
		value,
		label,
		selectOptions = [],
		type,
		onPropsChangerInput,
		onPropsChangerBlur,
	}: PropsChangerProps<
		string | number | boolean | object | undefined | null
	> = $props();

	$effect.pre(() => {
		if (type?.length) return;

		if (selectOptions?.length) {
			type = 'select';
		} else if (typeof value === 'number') {
			type = 'number';
		} else if (typeof value === 'boolean') {
			type = 'boolean';
		} else if (typeof value === 'string') {
			type = 'string';
		} else {
			type = 'json';
		}
	});

	let className = $derived(
		`props-changer--item--${type} props-changer--item--${dasherize(label)}`
	);

	const dispatchInput = () => {
		if (onPropsChangerInput) {
			onPropsChangerInput();
		}
	};

	const dispatchBlur = () => {
		if (onPropsChangerBlur) {
			onPropsChangerBlur();
		}
	};

	const optionsParsed = () => {
		if (selectOptions?.length && Array.isArray(selectOptions)) {
			return selectOptions.map((option) => {
				if (typeof option === 'string') {
					return { label: option, id: option };
				}
				if (typeof option === 'number') {
					return { label: option.toString(), id: option.toString() };
				}
				return option;
			});
		}
		return [];
	};

	const dropdownChangeHandler = (
		dropdownValueMutated: ComponentEvent<string, HTMLInputElement>
	) => {
		value = dropdownValueMutated.value!;
		dispatchInput();
	};

	const options = optionsParsed();
	let dropdownValue = $state(`${value}`);
	let id = `props-changer-${(Date.now() + Math.random()).toString(36)}`;
</script>

<div class="props-changer">
	<div class="props-changer--item {className}">
		{#if type === 'number' && (typeof value === 'number' || typeof value === 'undefined')}
			<Spinner
				{id}
				{label}
				min={0}
				max={100000}
				bind:value
				size={FORM_CONTROL_SIZE}
				onSpinnerChange={dispatchInput}
				onSpinnerInput={dispatchInput}
				onSpinnerBlur={dispatchBlur} />
		{:else if type === 'boolean' && (typeof value === 'boolean' || typeof value === 'undefined')}
			<Toggle
				{id}
				bind:on={value}
				size={FORM_CONTROL_SIZE}
				{label}
				onToggleChange={dispatchInput} />
		{:else if type === 'json' && (typeof value === 'object' || typeof value === 'undefined')}
			<label for={id}>
				{label}

				<JsonEditor
					{id}
					bind:value
					onJsonEditorInput={dispatchInput} />
			</label>
		{:else if type === 'select'}
			<Dropdown
				{id}
				{options}
				{label}
				size={FORM_CONTROL_SIZE}
				bind:value={dropdownValue}
				onDropdownChange={dropdownChangeHandler} />
		{:else if type === 'string' && (typeof value === 'string' || typeof value === 'undefined')}
			<TextInput
				{id}
				name="text"
				{label}
				type="text"
				size={FORM_CONTROL_SIZE}
				bind:value
				onTextInputInput={dispatchInput}
				onTextInputBlur={dispatchBlur} />
		{/if}
	</div>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.props-changer {
		display: flex;
		flex-direction: column;
	}
	.props-changer--item {
		font: $font--large;
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
</style>
