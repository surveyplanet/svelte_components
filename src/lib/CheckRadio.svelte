<script lang="ts">
	import type { ChangeEvent } from 'react';
	import { createEventDispatcher } from 'svelte';
	//group by ID

	const dispatch = createEventDispatcher();

	export let type: 'checkbox' | 'radio' = 'checkbox';
	export let id: string | null = null;
	export let value: string | null = null;
	export let label: string | null = null;
	export let checked: boolean = false;
	export let attr = {};
	export let disabled: boolean = false;
	export let prependLabel: boolean = false;

	let role = 'checkbox';
	if (disabled) {
		role = 'presentation';
	}
	const changeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
		if (disabled) {
			return;
		}
		dispatch('change', event);
	};
</script>

<div
	class="sp-checkbox"
	id="checkRadio"
	class:sp-checkbox--disabled={disabled}>
	<label
		class="sp-checkbox--wrapper"
		for={id}
		><input
			class="sp-checkbox--input"
			aria-label={label}
			{type}
			{id}
			name={id}
			{value}
			{checked}
			{...attr}
			role={type}
			{disabled}
			on:change={changeEventHandler} />
		{#if prependLabel}
			<span> {label}</span>
		{/if}
	</label>
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.sp-checkbox {
		font: $font-family--default;

		line-height: $size--32;

		&--input {
			margin-right: 0.5rem;
		}
	}
	.sp-checkbox--disabled {
		opacity: 0.5;
	}

	.sp-checkbox--input {
		&:checked {
			background-color: $color--slate;
			border-color: $color--slate;
		}
		&:checked + span {
			color: $color--slate-dark;
		}
		&:focus {
			box-shadow: 0 0 0 0.2rem $color--slate-light;
		}
	}
</style>
