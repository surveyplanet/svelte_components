<script lang="ts">
	import Checkbox from '$lib/Checkbox.svelte';
	import TextInput from '$lib/TextInput.svelte';
	import { dasherize } from '@surveyplanet/utilities';
	import JsonEditor from './JsonEditor.svelte';

	type ValueTypes = string | number | boolean | object;

	interface PropsChangerProps<T> {
		value: T;
		label: string;
		selectOptions?: string[] | { label: string; value: string }[];
		onInput?: (e: Event) => void;
		onBlur?: (e: Event) => void;
	}

	let {
		value,
		label,
		selectOptions = [],
		onInput,
		onBlur,
	} = $props<PropsChangerProps<ValueTypes>>();

	let type = $state('string');

	$effect(() => {
		if (typeof value === 'string') {
			type = 'string';
		} else if (typeof value === 'number') {
			type = 'number';
		} else if (typeof value === 'boolean') {
			type = 'boolean';
		} else if (selectOptions?.length) {
			type = 'select';
		} else {
			type = 'json';
		}
	});

	let className = $derived(`prop-changer-item--${type}--${dasherize(label)}`);

	// const jsonInputHandler = (e: Event) => {
	// 	const target = e.target as HTMLInputElement;
	// 	const value = target.value;
	// 	try {
	// 		value = JSON.parse(value);
	// 	} catch (e) {
	// 		console.error(e);
	// 	}
	// };
</script>

<div class="props-changer">
	<div class="props-changer--item {className}">
		{#if type === 'number'}
			<label for="number">{label}</label>
			<!-- TODO: use Spinner -->
			<input
				type="number"
				id="number"
				bind:value
				oninput={onInput}
				onblur={onBlur} />
		{:else if type === 'boolean'}
			<label for="boolean">{label}</label>
			<Checkbox
				id="boolean-{new Date().getTime()}"
				name="boolean-{label}s"
				bind:checked={value}
				size="medium"
				onChange={onInput} />
		{:else if type === 'json'}
			<JsonEditor />
		{:else if type === 'select'}
			<label for="select">{label}</label>
			<!-- TODO: replace with DropDown component -->
			<select
				bind:value
				id="select"
				oninput={onInput}
				onblur={onBlur}>
				{#each selectOptions as option}
					<option
						value={typeof option !== 'string' && 'value' in option
							? option.value
							: option}>
						{typeof option !== 'string' && 'label' in option
							? option.label
							: option}
					</option>
				{/each}
			</select>
		{:else}
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
