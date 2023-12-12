<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatchChange = createEventDispatcher<{
		change: Event;
	}>();

	export let id: string = (Date.now() + Math.random()).toString(36);
	export let name: string;
	export let value: string | null = null;
	export let label = '';
	export let checked = false;
	export let disabled = false;
	export let prependLabel = false;
	export let size: 'small' | 'medium' | 'large' = 'small';

	const changeEventHandler = (event: Event): void => {
		dispatchChange('change', event);
	};
</script>

<input
	type="radio"
	class="sp-radio--input"
	{name}
	{id}
	{value}
	{checked}
	{disabled}
	{...$$restProps}
	on:change={changeEventHandler} />

<label
	class="sp-radio sp-radio--{size}"
	class:sp-radio--prepend={prependLabel}
	for={id}>
	<span class="sp-radio--dot">
		<svg
			width="16px"
			height="16px"
			viewBox="0 0 16 16">
			<circle
				cx="8"
				cy="8"
				r="50%" />
		</svg>
	</span>
	<span class="sp-radio--label">{label}</span>
</label>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	@keyframes check {
		50% {
			transform: scale(1.2);
		}
	}
	:global(.sp-radio) {
		-webkit-user-select: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: $size--14;
		font: $font--default;
	}
	:global(.sp-radio:hover .sp-radio--dot) {
		border-color: $color--beige-darker-mid;
	}
	:global(.sp-radio.sp-radio--prepend) {
		flex-direction: row-reverse;
	}
	:global(.sp-radio.sp-radio--medium) {
		font-size: $font-size--14;
	}
	:global(.sp-radio.sp-radio--large) {
		font-size: $font-size--16;
	}

	:global(.sp-radio--dot) {
		position: relative;
		width: px-to-rem(22);
		height: px-to-rem(22);
		border-radius: 50%;
		transform: scale(1);
		border: 1px solid $color--beige-darker;
		transition: all 0.2s ease;
	}
	:global(.sp-radio--dot:before) {
		content: '';
		width: 100%;
		height: 100%;
		background: $color--darkest;
		display: block;
		transform: scale(0);
		opacity: 1;
		border-radius: 50%;
		transition-delay: 0.2s;
	}
	:global(.sp-radio--dot svg) {
		position: absolute;
		z-index: 1;
		top: 2px;
		left: 2px;
		fill: transparent;
		transition: all 0.3s ease;
		transition-delay: 0.1s;
		transform: translate3d(0, 0, 0);
	}

	:global(.sp-radio--label:empty) {
		display: none;
	}

	:global(.sp-radio--input) {
		appearance: none;
		margin: 0;
		padding: 0;
	}
	:global(.sp-radio--input:disabled + .sp-radio .sp-radio--dot) {
		border-color: $color--beige-darker;
		background-color: $color--beige-dark;
		outline: unset;
		outline-offset: unset;
	}
	:global(.sp-radio--input:checked + .sp-radio .sp-radio--dot) {
		border-color: $color--darkest;
		background: transparent;
		animation: check 0.6s ease;
	}
	:global(.sp-radio--input:checked + .sp-radio .sp-radio--dot svg) {
		fill: $color--darkest;
	}
	:global(.sp-radio--input:checked + .sp-radio .sp-radio--dot:before) {
		transform: scale(2.2);
		opacity: 0;
		transition: all 0.6s ease;
	}

	// focus
	:global(.sp-radio--input:focus-visible) {
		outline: none;
	}
	:global(.sp-radio--input:focus-visible + .sp-radio .sp-radio--dot) {
		box-shadow: 0px 0px 0px 1px $color--white,
			0px 0px 0px 2px $color--beige-darker;
	}
	@supports not selector(:focus-visible) {
		:global(.sp-radio--input:focus) {
			outline: none;
		}
		:global(.sp-radio--input:focus + .sp-radio .sp-radio--dot) {
			box-shadow: 0px 0px 0px 1px $color--white,
				0px 0px 0px 2px $color--beige-darker;
		}
	}
</style>
