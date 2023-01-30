<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { validate } from './';
	//make sure that ID is defined whenever you actually need to use the validator
	export let id: string = (Date.now() + Math.random()).toString(36);
	export let value: string | null = '';
	export let label: string | null = null;
	export let placeholder: string | null = null;
	export let multiline = false;
	export let readonly = false;
	export let disabled = false;
	export let attr = {};
	export let validationRules: string | null = null;
	export let validationMessage: string | null = null;
	export let validationHideMessage = false;

	const dispatch = createEventDispatcher();

	const changeHandler = (event: Event) => {
		validate(event.target);
		dispatch('change', event);
	};

	const focusHandler = (event: Event) => {
		dispatch('focus', event);
	};

	const blurHandler = (event: Event) => {
		dispatch('blur', event);
	};

	const keydownHandler = (event: object) => {
		dispatch('keydown', event);
	};

	const keyupHandler = (event: object) => {
		dispatch('keyup', event);
	};
</script>

{#if label?.length}
	<label
		class="sp-text-input--label"
		for={id}>
		<span class="sp-text-input--label--text">{label}</span>
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
		data-validate-rules={validationRules?.length ? validationRules : ''}
		data-validate-message={validationMessage?.length
			? validationMessage
			: ''}
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
		data-validate-rules={validationRules?.length ? validationRules : ''}
		data-validate-message={validationMessage?.length
			? validationMessage
			: ''}
		data-validate-hide-errors={validationHideMessage}
		on:blur={blurHandler}
		on:change={changeHandler}
		on:focus={focusHandler}
		on:keydown={keydownHandler}
		on:keyup={keyupHandler} />
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
