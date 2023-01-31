<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import validate from './utilities/validate';
	//make sure that ID is defined whenever you actualy need to use the validator
	export let id: string = (Date.now() + Math.random()).toString(36);
	export let value: string | null = '';
	export let label: string | null = null;
	export let placeholder: string | null = null;
	export let multiline = false;
	export let readonly = false;
	export let disabled = false;
	export let attr = {};
	export let validateString = '';

	const inputEl = document.getElementById(id);
	// validate(inputEl);
	// console.log('id', inputEl);

	const dispatch = createEventDispatcher();

	const changeHandler = (event: Event) => {
		dispatch('change', event);
		let idElement = event.target as HTMLInputElement;
		console.log('change :', id, idElement);
		validate(id);
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
		data-validate-rules="require,email"
		on:blur={blurHandler}
		on:change={(changeHandler,
		validate(inputEl),
		console.log('id', inputEl))}
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
		on:blur={blurHandler}
		on:change={changeHandler}
		on:focus={focusHandler}
		on:keydown={keydownHandler}
		on:keyup={keyupHandler} />
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
