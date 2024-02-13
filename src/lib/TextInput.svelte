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
		id: string;
		name: string;
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
		focus?: boolean;
		onTextInputInput?: (e: Event) => void;
		onTextInputBlur?: (e: FocusEvent) => void;
		onTextInputChange?: (e: Event) => void;
		onTextInputFocus?: (e: FocusEvent) => void;
		onTextInputKeydown?: (e: KeyboardEvent) => void;
		onTextInputKeyup?: (e: KeyboardEvent) => void;
	};
</script>

<script lang="ts">
	import { validate, type ValidatorError } from '@surveyplanet/utilities';
	import Cleave from 'cleave.js';
	import type { CleaveOptions } from 'cleave.js/options';
	import { Icon } from './index';
	import { onMount } from 'svelte';

	let {
		id,
		name,
		type,
		value,
		label,
		placeholder,
		readonly = false,
		disabled = false,
		cleaveOptions,
		validationRules = [''],
		validationMessage,
		size = 'small',
		validationHideMessage,
		focus,
		onTextInputInput,
		onTextInputBlur,
		onTextInputChange,
		onTextInputFocus,
		onTextInputKeydown,
		onTextInputKeyup,
	} = $props<TextInputProps>();

	let hasValidationErrors = $state(false);

	let validationDisplayMessage = $state('');

	let input = $state<undefined | HTMLInputElement | HTMLTextAreaElement>(
		undefined
	);

	onMount(() => {
		if (
			cleaveOptions &&
			Object.keys(cleaveOptions).length &&
			Object.prototype.toString.call(cleaveOptions) === '[object Object]'
		) {
			new Cleave(`#${id}`, cleaveOptions);
		}

		// console.log('--->', value);
	});

	$effect(() => {
		if (focus) {
			if (input) {
				input.focus();
			}
		}
	});

	const validateInput = (target: HTMLInputElement) => {
		const errors: ValidatorError[] = validate(target);

		if (errors.length) {
			hasValidationErrors = true;
			validationDisplayMessage = errors[0].error;
		}
	};

	const blurHandler = (event: FocusEvent) => {
		if (onTextInputFocus) onTextInputFocus(event);
	};
	const changeHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		validateInput(target);
		if (!hasValidationErrors && typeof onTextInputChange === 'function') {
			onTextInputChange(event);
		}
	};
	const inputHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		validateInput(target);
		if (!hasValidationErrors && typeof onTextInputInput === 'function') {
			onTextInputInput(event);
		}
	};

	const onkeyupHandler = (event: KeyboardEvent) => {
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
		if (onTextInputKeyup) onTextInputKeyup(event);
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
			bind:this={input}
			class="sp-text-input--input"
			{name}
			type="password"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={onTextInputBlur}
			onchange={changeHandler}
			onfocus={onTextInputFocus}
			onkeydown={onTextInputKeydown}
			onkeyup={onkeyupHandler} />
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
			bind:this={input}
			class="sp-text-input--input"
			{name}
			type="search"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			oninput={inputHandler}
			onblur={blurHandler}
			onchange={changeHandler}
			onfocus={onTextInputFocus}
			onkeydown={onTextInputKeydown}
			onkeyup={onkeyupHandler} />

		<span class="sp-text-input--search-icon">
			<Icon
				name="search"
				size={16} />
		</span>
	{:else if type === 'date'}
		<input
			bind:this={input}
			class="sp-text-input--input"
			{name}
			type="date"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={blurHandler}
			onchange={changeHandler}
			onfocus={onTextInputFocus}
			onkeydown={onTextInputKeydown}
			onkeyup={onkeyupHandler} />
	{:else if type === 'time'}
		<input
			bind:this={input}
			class="sp-text-input--input"
			{name}
			type="time"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={blurHandler}
			onchange={changeHandler}
			onfocus={onTextInputFocus}
			onkeydown={onTextInputKeydown}
			onkeyup={onkeyupHandler} />
	{:else if type === 'datetime-local'}
		<input
			bind:this={input}
			class="sp-text-input--input"
			{name}
			type="datetime-local"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={blurHandler}
			onchange={changeHandler}
			onfocus={onTextInputFocus}
			onkeydown={onTextInputKeydown}
			onkeyup={onkeyupHandler} />
	{:else if type === 'multiline'}
		<textarea
			bind:this={input}
			class="sp-text-input--textarea"
			{name}
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={blurHandler}
			onchange={changeHandler}
			onfocus={onTextInputFocus}
			onkeydown={onTextInputKeydown}
			onkeyup={onkeyupHandler}></textarea>
	{:else}
		<input
			bind:this={input}
			class="sp-text-input--input"
			{name}
			type="text"
			{id}
			{placeholder}
			{disabled}
			{readonly}
			bind:value
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={blurHandler}
			onchange={changeHandler}
			onfocus={onTextInputFocus}
			onkeydown={onTextInputKeydown}
			onkeyup={onkeyupHandler} />
	{/if}
	{#if !validationHideMessage && hasValidationErrors && validationDisplayMessage.length}
		<label
			for={id}
			class="validation-error-message">
			{@html validationDisplayMessage}
		</label>
	{/if}
</div>
