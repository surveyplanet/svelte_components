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

	const dispatchChange = createEventDispatcher<{ change: Event }>();
	const dispatchInput = createEventDispatcher<{ input: Event }>();
	const dispatchKeyDown = createEventDispatcher<{ keydown: Event }>();
	const dispatchKeyUp = createEventDispatcher<{ keyup: Event }>();
	const dispatchFocus = createEventDispatcher<{ focus: FocusEvent }>();
	const dispatchBlur = createEventDispatcher<{ blur: FocusEvent }>();

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
	export let value = '';

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

	const validateInput = (target: HTMLInputElement) => {
		const errors: ValidatorError[] = validate(target);

		if (errors.length) {
			hasValidationErrors = true;
			validationDisplayMessage = errors[0].error;
		}
	};

	const changeHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		validateInput(target);
		if (!hasValidationErrors) {
			dispatchChange('change', event);
		}
	};

	const inputHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		validateInput(target);
		if (!hasValidationErrors) {
			dispatchInput('input', event);
		}
	};

	const focusHandler = (event: FocusEvent) => {
		dispatchFocus('focus', event);
	};

	const blurHandler = (event: FocusEvent) => {
		dispatchBlur('blur', event);
	};

	const keydownHandler = (event: KeyboardEvent) => {
		dispatchKeyDown('keydown', event);
	};

	const keyupHandler = (event: KeyboardEvent) => {
		const target = event.target as HTMLInputElement;
		// if the input has errors validate on keyup
		if (hasValidationErrors) {
			const errors: ValidatorError[] = validate(target);

			hasValidationErrors = errors.length > 0;

			if (hasValidationErrors) {
				validationDisplayMessage = errors[0].error;
				return;
			}
		}
		dispatchKeyUp('keyup', event);
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
			class="sp-text-input--textarea"
			{name}
			{id}
			{placeholder}
			{disabled}
			{readonly}
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			on:input={inputHandler}
			on:blur={blurHandler}
			on:change={changeHandler}
			on:focus={focusHandler}
			on:keydown={keydownHandler}
			on:keyup={keyupHandler}>{value}</textarea>
	{:else}
		<input
			class="sp-text-input--input"
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
			on:input={inputHandler}
			on:change={changeHandler}
			on:focus={focusHandler}
			on:keydown={keydownHandler}
			on:keyup={keyupHandler} />
	{/if}
	{#if !validationHideMessage && hasValidationErrors && validationDisplayMessage.length}
		<label
			for={id}
			class="validation-error-message">
			{@html validationDisplayMessage}
		</label>
	{/if}
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	:global(.sp-text-input) {
		font: $font--default;
	}
	:global(.sp-text-input.sp-text-input--medium) {
		font-size: $font-size--14;
	}
	:global(.sp-text-input.sp-text-input--medium input) {
		height: $size--48;
	}
	:global(.sp-text-input.sp-text-input--large) {
		font-size: $font-size--16;
	}
	:global(.sp-text-input.sp-text-input--large input) {
		height: $size--52;
	}
	:global(
			.sp-text-input.validation-error input,
			.sp-text-input.validation-error textarea
		) {
		border-color: $color--pink;
	}

	:global(.sp-text-input--label) {
		color: $color--dark;
		display: block;
		font: inherit;
		padding: 0 0 $size--12 $size--4;
	}
	:global(.sp-text-input--label .sp-text-input--label--required) {
		color: $color--pink;
		font-size: smaller;
	}

	:global(.sp-text-input--input, .sp-text-input--textarea) {
		font: inherit;
		width: 100%;
		height: $size--40;
		min-width: $size--256;
		background-color: $color--white;
		border: 1px solid $color--beige-darker;
		border-radius: $size-radius--default;
		padding: $size--12 $size--16;
	}
	:global(
			.sp-text-input--input:focus-visible,
			.sp-text-input--textarea:focus-visible
		) {
		outline: none;
		border: 1px solid $color--beige-darker;
		box-shadow: 0px 0px 0px 2px $color--beige-dark;
	}
	@supports not selector(:focus-visible) {
		:global(.sp-text-input--input:focus, .sp-text-input--textarea:focus) {
			outline: none;
			border: 1px solid $color--beige-darker;
			box-shadow: 0px 0px 0px 2px $color--beige-dark;
		}
	}
	:global(.sp-text-input--input:active, .sp-text-input--textarea:active) {
		box-shadow: 0px 0px 0px 1px $color--white,
			0px 0px 0px 2px $color--beige-darkest;
	}
	:global(
			.sp-text-input--input:read-only:focus-visible,
			.sp-text-input--textarea:read-only:focus-visible
		) {
		outline: none;
		box-shadow: none;
	}
	@supports not selector(:focus-visible) {
		:global(
				.sp-text-input--input:read-only:focus,
				.sp-text-input--textarea:read-only:focus
			) {
			outline: none;
			box-shadow: none;
		}
	}
	:global(
			.sp-text-input--input:read-only:active,
			.sp-text-input--textarea:read-only:active
		) {
		box-shadow: none;
	}
	:global(.sp-text-input--input:disabled, .sp-text-input--textarea:disabled) {
		cursor: not-allowed;
		color: $color--beige-darkest;
		border-color: $color--beige-darker;
		background-color: $color--beige-dark;
		box-shadow: none;
	}
	:global(
			.sp-text-input--input:disabled:focus-visible,
			.sp-text-input--textarea:disabled:focus-visible
		) {
		outline: none;
		box-shadow: none;
	}
	@supports not selector(:focus-visible) {
		:global(
				.sp-text-input--input:disabled:focus,
				.sp-text-input--textarea:disabled:focus
			) {
			outline: none;
			box-shadow: none;
		}
	}
	:global(
			.sp-text-input--input:disabled:active,
			.sp-text-input--textarea:disabled:active
		) {
		box-shadow: none;
	}
	:global(
			.sp-text-input--input::placeholder,
			.sp-text-input--textarea::placeholder
		) {
		color: $color--beige-darkest;
	}

	:global(.validation-error-message) {
		font-size: $font-size--10;
		padding: $size--6 0 0 $size--4;
		color: $color--pink;
	}
	:global(.validation-error-message em) {
		font-style: normal;
	}
</style>
