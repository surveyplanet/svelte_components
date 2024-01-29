<script lang="ts">
	import Checkbox from '$lib/Checkbox.svelte';
	import TextInput from '$lib/TextInput.svelte';
	let {
		text,
		number,
		checkbox,
		object,
		select,
		oninput,
		onblur,
		selectOptions = [],
		value,
		label = '',
	} = $props<{
		text?: boolean;
		number?: boolean;
		checkbox?: boolean;
		object?: boolean;
		select?: boolean;
		selectOptions?: string[] | number[];
		oninput?: (e: Event) => void;
		onblur?: (e: Event) => void;
		value?: string | number | boolean | null;
		label?: string;
	}>();

	// let valueState = $state(value);
</script>

<div class="props-changer">
	{#if text && typeof value === 'string'}
		<div class="props-changer--item">
			<TextInput
				id={`text-${text}`}
				name="text"
				{label}
				type="text"
				multiline={false}
				bind:value
				{oninput}
				{onblur} />
		</div>
	{/if}
	{#if number}
		<div class="props-changer--item">
			<label for="number">{label}</label>
			<input
				type="number"
				id="number"
				bind:value
				{oninput}
				{onblur} />
		</div>
	{/if}
	{#if (checkbox && typeof value === 'boolean') || typeof value === 'undefined'}
		<div class="props-changer--item">
			<label for="boolean">{label}</label>
			<Checkbox
				id="boolean-{label}"
				name="boolean-{label}s"
				bind:checked={value}
				size="medium"
				onchange={oninput} />
		</div>
	{/if}
	{#if object && typeof value === 'string'}
		<div class="props-changer--item">
			<TextInput
				id={`object-${object}`}
				name="object"
				{label}
				type="text"
				multiline={true}
				{oninput}
				{onblur}
				bind:value />
		</div>
	{/if}
	{#if select}
		<div class="props-changer--item">
			<label for="select">{label}</label>
			<select
				bind:value
				id="select"
				{oninput}
				{onblur}>
				{#each selectOptions as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</div>
	{/if}
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
