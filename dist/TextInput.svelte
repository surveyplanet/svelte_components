<script
	context="module"
></script>

<script>import { createEventDispatcher } from "svelte";
import { validate } from "@surveyplanet/utilities";
import Cleave from "cleave.js";
const dispatch = createEventDispatcher();
export let id;
export let name;
export let type = "text";
export let value = "";
export let label = null;
export let placeholder = null;
export let multiline = false;
export let readonly = false;
export let disabled = false;
export let cleaveOptions = {};
export let validationRules = [];
export let validationMessage = null;
export let validationHideMessage = null;
let hasValidationErrors = false;
let validationDisplayMessage = "";
$: {
  if (Object.keys(cleaveOptions).length && Object.prototype.toString.call(cleaveOptions) === "[object Object]") {
    new Cleave(`#${id}`, cleaveOptions);
  }
}
const changeHandler = (event) => {
  const errors = validate(
    event.target
  );
  if (errors.length) {
    hasValidationErrors = true;
    validationDisplayMessage = errors[0].error;
    return;
  }
  dispatch("change", event);
};
const focusHandler = (event) => {
  dispatch("focus", event);
};
const blurHandler = (event) => {
  dispatch("blur", event);
};
const keydownHandler = (event) => {
  dispatch("keydown", event);
};
const keyupHandler = (event) => {
  if (hasValidationErrors) {
    const errors = validate(
      event.target
    );
    hasValidationErrors = errors.length > 0;
    if (hasValidationErrors) {
      validationDisplayMessage = errors[0].error;
      return;
    }
  }
  dispatch("keyup", event);
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

<style>/**
 * Capitalize the first letter of a word
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
/**
 * Remove the units (e.g.: px, rem, etc.) from a measurement
 */
.sp-text-input.validation-error input,
.sp-text-input.validation-error textarea {
  border-color: #ffb1e3;
}

label {
  color: #162137;
  display: block;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  padding: 0 0 0.75rem 0.25rem;
}
label .sp-text-input--label--required {
  color: #ffb1e3;
  font-size: 0.875rem;
}

input,
textarea {
  box-sizing: border-box;
  font: normal 400 0.875rem/140% "Suisse Screen Medium", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  width: 100%;
  height: 2.5rem;
  min-width: 16rem;
  background-color: #ffffff;
  border: 1px solid #dcdee1;
  border-radius: 5px;
  padding: 0.75rem 1rem;
}
input:focus-visible,
textarea:focus-visible {
  outline: none;
  box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
}
@supports not selector(:focus-visible) {
  input:focus,
  textarea:focus {
    outline: none;
    box-shadow: 0px 0px 0px 1px #ffffff, 0px 0px 0px 2px #737a87;
  }
}
input:active,
textarea:active {
  border: 1px solid #e7e3ff;
  box-shadow: 0px 0px 0px 2px #f4f0ff;
}
input:read-only:focus-visible,
textarea:read-only:focus-visible {
  outline: none;
  box-shadow: none;
}
@supports not selector(:focus-visible) {
  input:read-only:focus,
  textarea:read-only:focus {
    outline: none;
    box-shadow: none;
  }
}
input:read-only:active,
textarea:read-only:active {
  box-shadow: none;
}
input:disabled,
textarea:disabled {
  cursor: not-allowed;
  color: #a2a6af;
  border-color: #a2a6af;
  background-color: rgba(0, 0, 0, 0.075);
  box-shadow: none;
}
input:disabled:focus-visible,
textarea:disabled:focus-visible {
  outline: none;
  box-shadow: none;
}
@supports not selector(:focus-visible) {
  input:disabled:focus,
  textarea:disabled:focus {
    outline: none;
    box-shadow: none;
  }
}
input:disabled:active,
textarea:disabled:active {
  box-shadow: none;
}
input::placeholder,
textarea::placeholder {
  color: #a2a6af;
}

textarea {
  min-height: 5rem;
}

.validation-error-message {
  font-size: 0.625rem;
  padding: 0.375rem 0 0 0.25rem;
  color: #ffb1e3;
}
.validation-error-message :global(em) {
  font-style: normal;
}</style>
