<script lang="ts">
	import Checkbox from '$lib/Checkbox.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import Spinner from '$lib/Spinner.svelte';
	import Dropdown from '$lib/Dropdown.svelte';
	// import type { DropdownOptions } from '$lib/Dropdown.svelte';
	import { dasherize } from '@surveyplanet/utilities';
	import JsonEditor from './JsonEditor.svelte';

	type ValueTypes = string | number | boolean | object | undefined | null;

	interface PropsChangerProps<T> {
		value: T;
		label: string;
		type?: 'string' | 'number' | 'boolean' | 'json' | 'select';
		selectOptions?: string[] | number[] | { label: string; id: string }[];
		onInput?: () => void;
		onBlur?: () => void;
	}

	let {
		value,
		label,
		selectOptions = [],
		type,
		onInput,
		onBlur,
	} = $props<PropsChangerProps<ValueTypes>>();

	$effect(() => {
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

	const dropdownChangeHandler = (dropdownValueMutated: string) => {
		value = dropdownValueMutated;
	};

	const options = optionsParsed();
	let dropdownValue = $state<string>();
</script>

<div class="props-changer">
	<div class="props-changer--item {className}">
		{#if type === 'number' && typeof value === 'number'}
			<Spinner
				id="number-{(Date.now() + Math.random()).toString(36)}"
				{label}
				bind:value
				{onInput}
				{onBlur} />
		{:else if type === 'boolean' && typeof value === 'boolean'}
			<Checkbox
				id="boolean-{(Date.now() + Math.random()).toString(36)}"
				{label}
				prependLabel
				name="boolean-{label}s"
				bind:checked={value}
				size="medium"
				onChange={onInput} />
		{:else if type === 'json'}
			<JsonEditor />
		{:else if type === 'select'}
			<Dropdown
				{options}
				{label}
				placeholder={value?.toString() || 'Select an option'}
				value={dropdownValue}
				onChange={dropdownChangeHandler} />
		{:else if type === 'string' && typeof value === 'string'}
			<TextInput
				id={`text-${label}`}
				name="text"
				{label}
				type="text"
				bind:value
				{onInput}
				{onBlur} />
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
		label {
			margin-bottom: 0.5rem;
		}
		input {
			padding: 0.5rem;
			border-radius: 4px;
			border: 1px solid $color--beige;
		}
		input[type='checkbox'] {
			appearance: unset;
		}
	}
</style>
