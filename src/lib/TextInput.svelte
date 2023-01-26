<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	//group by ID

	export let value: string | null = null;
	export let label: string | null = null;
	export let placeholder: string | null = null;
	export let multiline: boolean = false;
	export let readonly: boolean = false;
	export let attr = {};
	export let disabled: boolean = false;
	export let validate: string = '';

	const dispatch = createEventDispatcher();

	const changeHandler = (event: Event) => {
		if (disabled) {
			return;
		}

		dispatch('change', event);
	};

	const focusHandler = (event: Event) => {
		if (disabled) {
			return;
		}
		dispatch('focus', event);
	};

	const blurHandler = (event: Event) => {
		if (disabled) {
			return;
		}

		dispatch('blur', event);
	};

	const keydownHandler = (event: Object) => {
		if (disabled) {
			return;
		}
		console.log(typeof event);
		dispatch('keydown', event);
	};

	const keyupHandler = (event: Object) => {
		if (disabled) {
			return;
		}

		dispatch('keyup', event);
	};

	if (!value || value.length === 0) {
		value = '';
	}
	Object.prototype.toString.call(keyupHandler);
	Object.prototype.toString.call(keydownHandler);
	Object.prototype.toString.call(blurHandler);
	Object.prototype.toString.call(focusHandler);
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
				{...attr}
				{disabled}
				{readonly}
				on:blur={blurHandler}
				on:change={changeHandler}
				on:focus={focusHandler}
				on:keydown={keydownHandler}
				on:keyup={keyupHandler} />
		{:else}
			<input
				class="sp-text-input--input"
				{placeholder}
				{...attr}
				{disabled}
				{readonly}
				{value}
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
