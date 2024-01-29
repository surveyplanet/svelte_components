<script
	lang="ts"
	context="module">
	export type TextInputType =
		| 'password'
		| 'search'
		| 'text'
		| 'date'
		| 'time'
		| 'datetime-local';

	export type TextInputProps = {
		id: string;
		name: string;
		type?: TextInputType;
		value?: string;
		label?: string;
		placeholder?: string | null;
		multiline?: boolean;
		readonly?: boolean;
		disabled?: boolean;
		cleaveOptions?: CleaveOptions;
		validationRules?: string[];
		validationMessage?: string | null;
		size?: 'small' | 'medium' | 'large';
		validationHideMessage?: boolean | null;
		oninput?: (e: Event) => void;
		onblur?: (e: Event) => void;
		onchange?: (e: Event) => void;
		onfocus?: (e: Event) => void;
		onkeydown?: (e: Event) => void;
		onkeyup?: (e: Event) => void;
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
		multiline = false,
		readonly,
		disabled,
		cleaveOptions,
		validationRules = [''],
		validationMessage,
		size = 'medium',
		validationHideMessage,
		oninput,
		onblur,
		onchange,
		onfocus,
		onkeydown,
		onkeyup,
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
		if (!hasValidationErrors && typeof onchange === 'function') {
			onchange(event);
		}
	};
	const inputHandler = (event: Event) => {
		const target = event.target as HTMLInputElement;
		validateInput(target);
		if (!hasValidationErrors && typeof oninput === 'function') {
			oninput(event);
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
		if (onkeyup) onkeyup(event);
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

	{#if multiline}
		<textarea
			class="sp-text-input--textarea"
			bind:value
			{name}
			{id}
			{placeholder}
			{disabled}
			{readonly}
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			{onblur}
			onchange={changeHandler}
			{onfocus}
			{onkeydown}
			onkeyup={onkeyupHandler}>{value}</textarea>
	{:else}
		<input
			class="sp-text-input--input"
			bind:value
			{name}
			{id}
			{placeholder}
			{disabled}
			{readonly}
			data-validate-rules={validationRules.length
				? validationRules.join(',')
				: null}
			data-validate-message={validationMessage}
			oninput={inputHandler}
			{onblur}
			onchange={changeHandler}
			{onfocus}
			{onkeydown}
			{onkeyup} />

		{#if type === 'password'}
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
		{/if}
	{/if}
	{#if !validationHideMessage && hasValidationErrors && validationDisplayMessage.length}
		<label
			for={id}
			class="validation-error-message">
			{@html validationDisplayMessage}
		</label>
	{/if}
</div>
