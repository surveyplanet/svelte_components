<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	//group by ID

	export let value: string | null = '';
	export let label: string | null = null;
	export let placeholder: string | null = null;
	export let multiline: boolean = false;
	export let readonly: boolean = false;
	export let attr = {};
	export let disabled: boolean = false;
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

<div
	class="sp-text-input"
	id="textInput">
	<label
		class="sp-text-input--label"
		for="textInput">
		{#if label && label.length}
			<span class="sp-text-input--label-text">{label}</span>
		{/if}
		{#if multiline}
			<textarea
				class="sp-text-input--input"
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
				class="sp-text-input--input"
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
	</label>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
</style>
