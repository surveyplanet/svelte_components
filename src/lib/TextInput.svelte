<script
	context="module"
	lang="ts">
	export type TextInputType =
		| 'password'
		| 'search'
		| 'text'
		| 'date'
		| 'time'
		| 'datetime-local'
		| 'multiline';

	export type TextInputProps = {
		id?: string;
		name?: string;
		type?: TextInputType;
		value?: string;
		label?: string;
		placeholder?: string | null;
		readonly?: boolean;
		disabled?: boolean;
		cleaveOptions?: CleaveOptions;
		validationRules?: string[];
		validationMessage?: string | null;
		size?: 'small' | 'medium' | 'large';
		validationHideMessage?: boolean | null;
		onTextInputInput?: (event: ComponentEvent<string>) => void;
		onTextInputChange?: (event: ComponentEvent<string>) => void;
		onTextInputKeydown?: (event: ComponentEvent<string>) => void;
		onTextInputKeyup?: (event: ComponentEvent<string>) => void;
		onTextInputFocus?: (event: ComponentEvent<undefined>) => void;
		onTextInputBlur?: (event: ComponentEvent<undefined>) => void;
	};
</script>

<script lang="ts">
	import { validate, type ValidatorError } from '@surveyplanet/utilities';
	import Cleave from 'cleave.js';
	import type { CleaveOptions } from 'cleave.js/options';
	import { Icon, ComponentEvent } from '$lib';
	import { onMount } from 'svelte';

	let {
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
		size = 'small', // inputs are small by default
		validationHideMessage,
		onTextInputInput,
		onTextInputBlur,
		onTextInputChange,
		onTextInputFocus,
		onTextInputKeydown,
		onTextInputKeyup,
	} = $props<TextInputProps>();

	let hasValidationErrors = $state(false);

	let validationDisplayMessage = $state('');

	onMount(() => {
		if (
			cleaveOptions &&
			Object.keys(cleaveOptions).length &&
			Object.prototype.toString.call(cleaveOptions) === '[object Object]'
		) {
			if (!id) {
				throw new Error(
					'The "id" property is required when using "cleaveOptions"'
				);
			}
			new Cleave(`#${id}`, cleaveOptions);
		}
	});

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
		if (!hasValidationErrors && typeof onTextInputChange === 'function') {
			const componentEvent = new ComponentEvent<string>(
				target.value,
				target,
				event
			);
			onTextInputChange(componentEvent);
		}
	};
	const inputHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		validateInput(target);
		if (!hasValidationErrors && typeof onTextInputInput === 'function') {
			const componentEvent = new ComponentEvent<string>(
				target.value,
				target,
				event
			);
			onTextInputInput(componentEvent);
		}
	};

	const keyupHandler = (event: Event) => {
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
		if (typeof onTextInputKeyup === 'function') {
			const componentEvent = new ComponentEvent<string>(
				target.value,
				target,
				event
			);
			onTextInputKeyup(componentEvent);
		}
	};

	const keydownHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (typeof onTextInputKeydown === 'function') {
			const componentEvent = new ComponentEvent<string>(
				target.value,
				target,
				event
			);
			onTextInputKeydown(componentEvent);
		}
	};

	const inputFocusHandler = (event: Event) => {
		if (typeof onTextInputFocus === 'function') {
			const componentEvent = new ComponentEvent<undefined>(
				undefined,
				event.target as HTMLInputElement,
				event
			);
			onTextInputFocus(componentEvent);
		}
	};

	const inputBlurHandler = (event: Event) => {
		if (typeof onTextInputBlur === 'function') {
			const componentEvent = new ComponentEvent<undefined>(
				undefined,
				event.target as HTMLInputElement,
				event
			);
			onTextInputBlur(componentEvent);
		}
	};

	const passwordButtonClickHandler = () => {
		if (document && id?.length) {
			const input = document.getElementById(id) as HTMLInputElement;
			if (input) {
				input.type = input.type === 'password' ? 'text' : 'password';
			}
		}
	};
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<div
	class="sp-form-control sp-text-input sp-text-input--{size}"
	class:validation-error={hasValidationErrors}>
	{#if label?.length}
		<label
			class="sp-text-input--label"
			for={id}>
			<span class="sp-text-input--label--text">{label}</span>
			{#if validationRules && validationRules.includes('require')}
				<span class="sp-text-input--label--required">*</span>
			{/if}
		</label>
	{/if}

	{#if type === 'password'}
		<input
			class="sp-text-input--input"
			{name}
			type="password"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules?.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onchange={changeHandler}
			onkeydown={keydownHandler}
			onkeyup={keyupHandler}
			onblur={inputBlurHandler}
			onfocus={inputFocusHandler} />
		{#if value?.length}
			<button
				class="sp-text-input--password-toggle"
				type="button"
				onclick={passwordButtonClickHandler}>
				<Icon
					name="eye"
					size={16} />
			</button>
		{/if}
	{:else if type === 'search'}
		<input
			class="sp-text-input--input"
			{name}
			type="search"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			oninput={inputHandler}
			onchange={changeHandler}
			onkeydown={keydownHandler}
			onkeyup={keyupHandler}
			onblur={inputBlurHandler}
			onfocus={inputFocusHandler} />

		<span class="sp-text-input--search-icon">
			<Icon
				name="search"
				size={16} />
		</span>
	{:else if type === 'date'}
		<input
			class="sp-text-input--input"
			{name}
			type="date"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules?.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onchange={changeHandler}
			onkeydown={keydownHandler}
			onkeyup={keyupHandler}
			onblur={inputBlurHandler}
			onfocus={inputFocusHandler} />
	{:else if type === 'time'}
		<input
			class="sp-text-input--input"
			{name}
			type="time"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules?.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onchange={changeHandler}
			onkeydown={keydownHandler}
			onkeyup={keyupHandler}
			onblur={inputBlurHandler}
			onfocus={inputFocusHandler} />
	{:else if type === 'datetime-local'}
		<input
			class="sp-text-input--input"
			{name}
			type="datetime-local"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules?.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onchange={changeHandler}
			onkeydown={keydownHandler}
			onkeyup={keyupHandler}
			onblur={inputBlurHandler}
			onfocus={inputFocusHandler} />
	{:else if type === 'multiline'}
		<textarea
			class="sp-text-input--textarea"
			{name}
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules?.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onchange={changeHandler}
			onkeydown={keydownHandler}
			onkeyup={keyupHandler}
			onblur={inputBlurHandler}
			onfocus={inputFocusHandler}></textarea>
	{:else}
		<input
			class="sp-text-input--input"
			{name}
			type="text"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules?.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onchange={changeHandler}
			onkeydown={keydownHandler}
			onkeyup={keyupHandler}
			onblur={inputBlurHandler}
			onfocus={inputFocusHandler} />
	{/if}
	{#if !validationHideMessage && hasValidationErrors && validationDisplayMessage.length}
		<label
			for={id}
			class="validation-error-message">
			{@html validationDisplayMessage}
		</label>
	{/if}
</div>
