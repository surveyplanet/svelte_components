<script lang="ts">
	import Checkbox from '$lib/Checkbox.svelte';
	import TextInput from '$lib/TextInput.svelte';
	let {
		text,
		number,
		boolean,
		object,
		select,
		oninput,
		onblur,
		selectOptions = [],
		value = '',
	} = $props<{
		text?: string;
		number?: string;
		boolean?: string;
		object?: string;
		select?: string;
		selectOptions?: string[] | number[];
		oninput?: (e: Event) => void;
		onblur?: (e: Event) => void;
		value?: string | number | boolean | null | undefined;
	}>();
</script>

<div class="props-changer">
	{#if text && typeof value === 'string'}
		<div class="props-changer--item">
			<TextInput
				id={`text-${text}`}
				name="text"
				label={text}
				type="text"
				multiline={false}
				{value}
				{oninput}
				{onblur} />
		</div>
	{/if}
	{#if number}
		<div class="props-changer--item">
			<label for="number">{number}</label>
			<input
				type="number"
				id="number"
				{value}
				{oninput}
				{onblur} />
		</div>
	{/if}
	{#if (boolean && typeof value === 'boolean') || typeof value === 'undefined'}
		<div class="props-changer--item">
			<label for="boolean">{boolean}</label>
			<Checkbox
				id="boolean-{boolean}"
				name="boolean-{boolean}s"
				checked={value}
				size="medium"
				onchange={oninput} />
		</div>
	{/if}
	{#if object && typeof value === 'string'}
		<div class="props-changer--item">
			<TextInput
				id={`object-${object}`}
				name="object"
				label={object}
				type="text"
				multiline={true}
				{oninput}
				{onblur}
				{value} />
		</div>
	{/if}
	{#if select}
		<div class="props-changer--item">
			<label for="select">{select}</label>
			<select
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
