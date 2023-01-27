<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	//group by ID

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let value: string | null = '';
	export let label: string | null = null;
	export let placeholder: string | null = null;
	export let multiline: boolean = false;
	export let readonly: boolean = false;
	export let disabled: boolean = false;
	export let attr = {};
	// export let validate: string = '';

	const dispatch = createEventDispatcher();

	const changeHandler = (event: Event) => {
		dispatch('change', event);
	};

	const focusHandler = (event: Event) => {
		dispatch('focus', event);
	};

	const blurHandler = (event: Event) => {
		dispatch('blur', event);
	};

	const keydownHandler = (event: Object) => {
		dispatch('keydown', event);
	};

	const keyupHandler = (event: Object) => {
		dispatch('keyup', event);
	};
</script>

{#if label && label.length}
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
		on:blur={blurHandler}
		on:change={changeHandler}
		on:focus={focusHandler}
		on:keydown={keydownHandler}
		on:keyup={keyupHandler} />
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
