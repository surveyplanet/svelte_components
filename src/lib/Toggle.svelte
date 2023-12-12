<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatchChange = createEventDispatcher<{
		change: boolean;
	}>();

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let name: string;
	export let disabled = false;
	export let on = false;
	export let tall = false;
	export let label: string | null = null;
	export let prependLabel = false;
	// export let meridiemIndicator = false;

	const changeHandler = (event: Event): void => {
		if (disabled) {
			on = false;
			return event.preventDefault();
		}

		dispatchChange('change', on);
	};
</script>

{#if label?.length && prependLabel}
	<label
		class="sp-toggle--label sp-toggle--label-prepend"
		class:sp-toggle--label--disabled={disabled}
		for={id}>{label}</label>
{/if}

<div
	class="sp-toggle sp-toggle--{on ? 'on' : 'off'}"
	class:sp-toggle--tall={tall}
	role="switch"
	aria-checked={on}>
	<input
		type="checkbox"
		class="sp-toggle--input"
		bind:checked={on}
		{id}
		{name}
		{disabled}
		on:change={changeHandler} />

	<div class="sp-toggle--track" />
</div>

{#if label?.length && !prependLabel}
	<label
		class="sp-toggle--label"
		class:sp-toggle--label--disabled={disabled}
		for={id}>{label}</label>
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	:global(.sp-toggle) {
		font: $font--default;
		display: inline-block;
		position: relative;
		width: $size--40;
		height: $size--20;
	}
	:global(.sp-toggle:focus-visible) {
		outline: none;
	}
	:global(.sp-toggle:focus-visible .sp-toggle--track) {
		box-shadow: 0px 0px 0px 1px $color--white, 0px 0px 0px 2px $color--beige;
	}
	@supports not selector(:focus-visible) {
		:global(.sp-toggle:focus) {
			outline: none;
		}
		:global(.sp-toggle:focus .sp-toggle--track) {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--beige;
		}
	}
	:global(.sp-toggle--input) {
		position: absolute;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		cursor: pointer;
		z-index: 1;
	}
	:global(.sp-toggle--input:checked + .sp-toggle--track) {
		background-color: $color--darkest;
	}
	:global(.sp-toggle--input:checked + .sp-toggle--track:after) {
		transform: translateX(calc(100% + 4px));
	}
	:global(.sp-toggle--input:focus-visible) {
		outline: none;
	}
	:global(.sp-toggle--input:focus-visible + .sp-toggle--track) {
		box-shadow: 0px 0px 0px 1px $color--white, 0px 0px 0px 2px $color--beige;
	}
	@supports not selector(:focus-visible) {
		:global(.sp-toggle--input:focus) {
			outline: none;
		}
		:global(.sp-toggle--input:focus + .sp-toggle--track) {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--beige;
		}
	}
	:global(.sp-toggle--input:disabled + .sp-toggle--track) {
		background-color: $color--beige-dark;
	}
	:global(.sp-toggle--input:disabled + .sp-toggle--track:after) {
		background-color: $color--beige-darker;
	}
	:global(.sp-toggle--track) {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: $size--20;
		background-color: $color--beige-darker;
		transition: transform 400ms, background-color 400ms;
	}
	:global(.sp-toggle--track:after) {
		position: absolute;
		content: '';
		height: calc($size--20 - 4px);
		width: calc($size--20 - 4px);
		left: 2px;
		top: 2px;
		background-color: $color--white;
		transition: transform 400ms, background-color 400ms;
		border-radius: 50%;
	}
	:global(.sp-toggle.sp-toggle--tall) {
		width: $size--36;
		height: $size--24;
	}
	:global(.sp-toggle.sp-toggle--tall .sp-toggle--track:after) {
		position: absolute;
		content: '';
		height: calc($size--24 - 4px);
		width: calc($size--24 - 4px);
	}
	:global(
			.sp-toggle.sp-toggle--tall
				.sp-toggle--input:checked
				+ .sp-toggle--track:after
		) {
		transform: translateX(calc(100% - 8px));
	}

	:global(.sp-toggle--label) {
		cursor: pointer;
		display: inline-block;
		vertical-align: top;
		font: $font--default;
		height: $size--20;
		line-height: $size--20;
		font-size: $font-size--12;
		padding-left: $size-gutter--quarter;
	}
</style>
