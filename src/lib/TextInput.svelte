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
		onInput?: (e: Event) => void;
		onBlur?: (e: Event) => void;
		onChange?: (e: Event) => void;
		onFocus?: (e: Event) => void;
		onKeydown?: (e: Event) => void;
		onKeyup?: (e: Event) => void;
	};
</script>

<script lang="ts">
	import { validate, type ValidatorError } from '@surveyplanet/utilities';
	import Cleave from 'cleave.js';
	import type { CleaveOptions } from 'cleave.js/options';
	import { Icon } from './index';

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
		validationRules = [''],
		validationMessage,
		size = 'medium',
		validationHideMessage,
		onInput,
		onBlur,
		onChange,
		onFocus,
		onKeydown,
		onKeyup,
	} = $props<TextInputProps>();

	let hasValidationErrors = $state(false);

	let validationDisplayMessage = $state('');

	$effect(() => {
		if (
			cleaveOptions &&
			Object.keys(cleaveOptions).length &&
			Object.prototype.toString.call(cleaveOptions) === '[object Object]'
		) {
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
		if (!hasValidationErrors && typeof onChange === 'function') {
			onChange(event);
		}
	};
	const inputHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		validateInput(target);
		if (!hasValidationErrors && typeof onInput === 'function') {
			onInput(event);
		}
	};

	const onkeyupHandler = (event: Event) => {
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
		if (onKeyup) onKeyup(event);
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
			{#if validationRules && validationRules.includes('require')}
				<span class="sp-text-input--label--required">*</span>
			{/if}
		</label>
	{/if}

	{#if type === 'text'}
		<input
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
			onblur={onBlur}
			onchange={changeHandler}
			onfocus={onFocus}
			onkeydown={onKeydown}
			onkeyup={onkeyupHandler} />
	{:else if type === 'password'}
		<input
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
			onblur={onBlur}
			onchange={changeHandler}
			onfocus={onFocus}
			onkeydown={onKeydown}
			onkeyup={onkeyupHandler} />
		{#if value?.length}
			<button
				class="sp-text-input--password-toggle"
				type="button"
				onclick={() => {
						const input = document.getElementById(id) as HTMLInputElement;
						if (input) {
							input.type = input.type === 'password' ? 'text' : 'password';
						}
					}}>
				<Icon
					name="eye"
					size={16} />
			</button>
		{/if}
	{:else if type === 'search'}
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
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={onBlur}
			onchange={changeHandler}
			onfocus={onFocus}
			onkeydown={onKeydown}
			onkeyup={onkeyupHandler} />
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
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={onBlur}
			onchange={changeHandler}
			onfocus={onFocus}
			onkeydown={onKeydown}
			onkeyup={onkeyupHandler} />
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
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			onblur={onBlur}
			onchange={changeHandler}
			onfocus={onFocus}
			onkeydown={onKeydown}
			onkeyup={onkeyupHandler} />
	{:else if type === 'multiline'}
		<textarea
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
			onblur={onBlur}
			onchange={changeHandler}
			onfocus={onFocus}
			onkeydown={onKeydown}
			onkeyup={onkeyupHandler}>{value}</textarea>
	{/if}
	{#if !validationHideMessage && hasValidationErrors && validationDisplayMessage.length}
		<label
			for={id}
			class="validation-error-message">
			{@html validationDisplayMessage}
		</label>
	{/if}
</div>
