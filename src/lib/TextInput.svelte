<script
	context="module"
	lang="ts">
	export type TextInputType =
		| 'password'
		| 'search'
		| 'text'
		| 'date'
		| 'time'
		| 'datetime-local';
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { validate, type ValidatorError } from '@surveyplanet/utilities';
	import Cleave from 'cleave.js';
	import type { CleaveOptions } from 'cleave.js/options';

	const dispatch: (name: string, detail: Event) => boolean =
		createEventDispatcher();

	/**
	 * The unique id of the input
	 */
	export let id: string;

	/**
	 * The name of the input
	 */
	export let name: string;

	/**
	 * The input type, default: 'text'
	 */
	export let type: TextInputType = 'text';

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
	 * Whether the input should be read only. If you want the user to identify the input as in non-modified mode, use disabled instead.
	 */
	export let readonly = false;

	/**
	 * Whether the input should be disabled. If you want a non-modified element to appear like the rest of the form elements, use readonly instead.
	 */
	export let disabled = false;

	/**
	 * Cleave.js options for masked input. See: https://github.com/nosir/cleave.js
	 */
	export let cleaveOptions: CleaveOptions = {};

	/**
	 * A list of validation rules for the input. See: https://github.com/surveyplanet/utilities
	 */
	export let validationRules: string[] = [];

	/**
	 * A custom validation message to be used instead of the default
	 */
	export let validationMessage: string | null = null;

	export let size: 'small' | 'medium' | 'large' = 'small';

	/**
	 * Whether to automatically show the validation error message or not.
	 */
	export let validationHideMessage: boolean | null = null;

	let hasValidationErrors = false;

	let validationDisplayMessage = '';

	$: {
		if (
			Object.keys(cleaveOptions).length &&
			Object.prototype.toString.call(cleaveOptions) === '[object Object]'
		) {
			new Cleave(`#${id}`, cleaveOptions);
		}
	}

	const changeHandler = (event: Event) => {
		const errors: ValidatorError[] = validate(
			event.target as HTMLInputElement
		);
		if (errors.length) {
			hasValidationErrors = true;
			validationDisplayMessage = errors[0].error;
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
		// if the input has errors validate on keyup
		if (hasValidationErrors) {
			const errors: ValidatorError[] = validate(
				event.target as HTMLInputElement
			);

			hasValidationErrors = errors.length > 0;

			if (hasValidationErrors) {
				validationDisplayMessage = errors[0].error;
				return;
			}
		}
		dispatch('keyup', event);
	};
</script>

<div
	class="sp-text-input sp-text-input--{size}"
	class:validation-error={hasValidationErrors}>
	{#if label?.length}
		<label
			class="sp-text-input--label"
			for={id}>
			<span class="sp-text-input--label--text">{label}</span>
			{#if validationRules.includes('require')}
				<span class="sp-text-input--label--required">*</span>
			{/if}
		</label>
	{/if}

	{#if multiline}
		<textarea
			{name}
			{id}
			{placeholder}
			{disabled}
			{readonly}
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			on:blur={blurHandler}
			on:change={changeHandler}
			on:focus={focusHandler}
			on:keydown={keydownHandler}
			on:keyup={keyupHandler}>{value}</textarea>
	{:else}
		<input
			{name}
			{type}
			{id}
			{placeholder}
			{disabled}
			{readonly}
			{value}
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			on:blur={blurHandler}
			on:change={changeHandler}
			on:focus={focusHandler}
			on:keydown={keydownHandler}
			on:keyup={keyupHandler} />
	{/if}
	{#if !validationHideMessage && hasValidationErrors && validationDisplayMessage.length}
		<label
			for={id}
			class="validation-error-message"
			>{@html validationDisplayMessage}</label>
	{/if}
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.sp-text-input {
		font: $font--default;

		&.sp-text-input--medium {
			font-size: $font-size--14;
			input {
				height: $size--48;
			}
		}
		&.sp-text-input--large {
			font-size: $font-size--16;
			input {
				height: $size--52;
			}
		}

		&.validation-error {
			input,
			textarea {
				border-color: $color--pink;
			}
		}
	}

	label {
		color: $color--dark;
		display: block;
		font: inherit;
		padding: 0 0 $size--12 $size--4;
		.sp-text-input--label--required {
			color: $color--pink;
			font-size: smaller;
		}
	}

	input,
	textarea {
		box-sizing: border-box;
		font: inherit;
		width: 100%;
		height: $size--40;
		min-width: $size--256;
		background-color: $color--white;
		border: 1px solid $color--beige-darker;
		border-radius: $size-radius--default;
		padding: $size--12 $size--16;
		@include set-focus {
			border: 1px solid $color--beige-darker;
			box-shadow: 0px 0px 0px 2px $color--beige-dark;
		}

		&:active {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--beige-darkest;
		}

		// read-only controls can still function and are still focusable
		&:read-only {
			@include set-focus {
				box-shadow: none;
			}
			&:active {
				box-shadow: none;
			}
		}

		// disabled controls can not receive focus and are not submitted with the
		// form and generally do not function as controls until they are enabled
		&:disabled {
			cursor: not-allowed;
			color: $color--beige-darkest;
			border-color: $color--beige-darker;
			background-color: $color--beige-dark;
			box-shadow: none;
			@include set-focus {
				box-shadow: none;
			}
			&:active {
				box-shadow: none;
			}
		}

		&::placeholder {
			color: $color--beige-darkest;
		}
	}

	textarea {
		min-height: $size--80;
	}

	.validation-error-message {
		font-size: $font-size--10;
		padding: $size--6 0 0 $size--4;
		color: $color--pink;
		:global(em) {
			font-style: normal;
		}
	}
</style>
