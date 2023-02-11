<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { validate, type ValidatorError } from '@surveyplanet/utilities';

	const dispatch = createEventDispatcher();

	/**
	 * The unique id of the input
	 */
	export let id: string = (Date.now() + Math.random()).toString(36);

	/**
	 * The value of the input
	 */
	export let value: string | null = '';

	/**
	 * The input label
	 */
	export let label: string | null = null;

	/**
	 * The input placeholder
	 */
	export let placeholder: string | null = null;

	/**
	 * Whether the input should be a single or multi-line
	 */
	export let multiline = false;

	/**
	 * Whether the input should be read only
	 */
	export let readonly = false;

	/**
	 * Whether the input should be disabled
	 */
	export let disabled = false;

	/**
	 * Any additional attributes that that should be applied to the input
	 */
	export let attr = {};

	/**
	 * A list of validation rules for the input. See: https://github.com/surveyplanet/utilities
	 */
	export let validationRules: string[] = [];

	/**
	 * A custom validation message to be used instead of the default
	 */
	export let validationMessage: string | null = null;

	/**
	 * Whether to automatically show the validation error message or not.
	 */
	export let validationHideMessage: boolean | null = null;

	const changeHandler = (event: Event) => {
		const errors: ValidatorError[] = validate(
			event.target as HTMLInputElement
		);
		console.log('validation errors', errors);

		if (errors.length) {
			return;
		}
		dispatch('change', event);
	};

	const focusHandler = (event: FocusEvent) => {
		dispatch('focus', event);
	};

	const blurHandler = (event: FocusEvent) => {
		dispatch('blur', event);
	};

	const keydownHandler = (event: KeyboardEvent) => {
		dispatch('keydown', event);
	};

	const keyupHandler = (event: KeyboardEvent) => {
		dispatch('keyup', event);
	};
</script>

{#if label?.length}
	<label
		class="sp-text-input--label"
		for={id}>
		<span class="sp-text-input--label--text">{label}</span>
		{#if validationRules.includes('require')}
			<span class="sp-text-input--label--require">*</span>
		{/if}
	</label>
{/if}

{#if multiline}
	<textarea
		class="sp-text-input"
		{id}
		{placeholder}
		{disabled}
		{readonly}
		{...attr}
		data-validate-rules={validationRules.length
			? validationRules.join(',')
			: null}
		data-validate-message={validationMessage}
		data-validate-hide-errors={validationHideMessage}
		on:blur={blurHandler}
		on:change={changeHandler}
		on:focus={focusHandler}
		on:keydown={keydownHandler}
		on:keyup={keyupHandler}>{value}</textarea>
{:else}
	<input
		class="sp-text-input"
		{id}
		{placeholder}
		{disabled}
		{readonly}
		{value}
		{...attr}
		data-validate-rules={validationRules.length
			? validationRules.join(',')
			: null}
		data-validate-message={validationMessage}
		data-validate-hide-errors={validationHideMessage}
		on:blur={blurHandler}
		on:change={changeHandler}
		on:focus={focusHandler}
		on:keydown={keydownHandler}
		on:keyup={keyupHandler} />
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	label {
		display: block;
		font: $font--default;
		font-size: $font-size--12;
		padding: 0 0 $size--12 $size--4;
		.sp-text-input--label--require {
			color: $color--pink;
			font-size: $font-size--14;
		}
	}

	input,
	textarea {
		box-sizing: border-box;
		font: $font--default;
		font-size: $font-size--12;
		min-height: $size--40;
		min-width: $size--256;
		background-color: $color--white;
		border: 1px solid $color--slate-lighter;
		border-radius: $size-radius--default;
		padding: $size--12 $size--16;
		@include set-focus {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--slate;
		}
		&:active {
			border: 1px solid #e7e3ff;
			box-shadow: 0px 0px 0px 2px $color--light-purple-light;
		}
		&.validation-error {
			border-color: $color--pink;
		}

		&::placeholder {
			color: $color--slate-light;
		}
	}

	textarea {
		min-height: $size--80;
	}
</style>
