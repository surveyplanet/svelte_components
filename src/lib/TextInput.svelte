<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import { validate, type ValidatorError } from '@surveyplanet/utilities';
	import Cleave from 'cleave.js';
	import type { CleaveOptions } from 'cleave.js/options';

	const dispatch = createEventDispatcher();

	/**
	 * The unique id of the input
	 */
	export let id: string = (Date.now() + Math.random()).toString(36);

	/**
	 * The name of the input
	 */
	export let name: string;

	/**
	 * The input type, default: 'text'
	 */
	export let type = 'text';

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

	/**
	 * Whether to automatically show the validation error message or not.
	 */
	export let validationHideMessage: boolean | null = null;

	let hasValidationErrors = false;

	let validationDisplayMessage = '';

	onMount(() => {
		if (
			Object.keys(cleaveOptions).length &&
			Object.prototype.toString.call(cleaveOptions) === '[object Object]'
		) {
			new Cleave(`#${id}`, cleaveOptions);
		}
	});

	const changeHandler = (event: Event) => {
		console.log(event.target);

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
	class="sp-text-input"
	class:validation-error={hasValidationErrors}>
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
		&.validation-error {
			input,
			textarea {
				border-color: $color--pink;
			}
		}
	}

	label {
		color: $color--slate-dark;
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
		width: 100%;
		height: $size--40;
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
			color: $color--slate-light;
			border-color: $color--slate-light;
			background-color: rgba(0, 0, 0, 0.075);
			box-shadow: none;
			@include set-focus {
				box-shadow: none;
			}
			&:active {
				box-shadow: none;
			}
		}

		&::placeholder {
			color: $color--slate-light;
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
