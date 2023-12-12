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

	const changeEventHandler = (event: Event) => {
		dispatchChange('change', event);
	};
</script>

<input
	type="checkbox"
	class="sp-checkbox--input"
	{id}
	{name}
	{value}
	{checked}
	{disabled}
	{...$$restProps}
	on:change={changeEventHandler} />
<label
	class="sp-checkbox sp-checkbox--{size}"
	class:sp-checkbox--prepend={prependLabel}
	for={id}>
	<span class="sp-checkbox--check">
		<svg
			width="12px"
			height="9px"
			viewBox="0 0 12 9">
			<polyline points="1 5 4 8 11 1" />
		</svg>
	</span>
	<span class="sp-checkbox--label">{label}</span>
</label>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	@keyframes check {
		50% {
			transform: scale(1.2);
		}
	}

	:global(.sp-checkbox) {
		-webkit-user-select: none;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		flex-wrap: nowrap;
		gap: $size--14;
		font: $font--default;
		font-size: $font-size--12;
	}

	:global(.sp-checkbox:hover .sp-checkbox--check) {
		border-color: $color--beige-darkest;
	}

	:global(.sp-checkbox.sp-checkbox--prepend) {
		flex-direction: row-reverse;
	}

	:global(.sp-checkbox.sp-checkbox--medium) {
		font-size: $font-size--14;
	}

	:global(.sp-checkbox.sp-checkbox--large) {
		font-size: $font-size--16;
	}

	:global(.sp-checkbox--check) {
		position: relative;
		width: px-to-rem(22);
		height: px-to-rem(22);
		border-radius: $size-radius--small;
		transform: scale(1);
		border: 1px solid $color--beige-darker;
		transition: all 0.2s ease;
		:global(svg) {
			position: absolute;
			z-index: 1;
			top: 6px;
			left: 4px;
			fill: none;
			stroke: $color--white;
			stroke-width: 2;
			stroke-linecap: round;
			stroke-linejoin: round;
			stroke-dasharray: 16px;
			stroke-dashoffset: 16px;
			transition: all 0.3s ease;
			transition-delay: 0.1s;
			transform: translate3d(0, 0, 0);
		}
	}

	:global(.sp-checkbox--check:before) {
		content: '';
		width: 100%;
		height: 100%;
		background: $color--darkest;
		display: block;
		transform: scale(0);
		opacity: 1;
		border-radius: $size-radius--default;
		transition-delay: 0.2s;
	}

	:global(.sp-checkbox--check:empty) {
		display: none;
	}

	:global(.sp-checkbox--input) {
		appearance: none;
	}

	:global(.sp-checkbox--input:disabled + .sp-checkbox .sp-checkbox--check) {
		border-color: $color--beige-darker;
		background-color: $color--beige-dark;
		outline: unset;
		outline-offset: unset;
	}

	:global(
			.sp-checkbox--input:checked:not(:disabled)
				+ .sp-checkbox
				.sp-checkbox--check
		) {
		border-color: $color--darkest;
		background: $color--darkest;
		animation: check 0.6s ease;
	}

	:global(
			.sp-checkbox--input:checked:not(:disabled)
				+ .sp-checkbox
				.sp-checkbox--check
				svg
		) {
		stroke-dashoffset: 0;
	}
	:global(
			.sp-checkbox--input:checked:not(:disabled)
				+ .sp-checkbox
				.sp-checkbox--check:before
		) {
		transform: scale(2.2);
		opacity: 0;
		transition: all 0.6s ease;
	}
	:global(.sp-checkbox--input:focus-visible) {
		outline: none;
	}
	:global(
			.sp-checkbox--input:focus-visible + .sp-checkbox .sp-checkbox--check
		) {
		box-shadow: 0px 0px 0px 2px $color--beige,
			0px 0px 0px 3px $color--beige-darkest;
	}
	@supports not selector(:focus-visible) {
		:global(.sp-checkbox--input:focus) {
			outline: none;
		}
		:global(.sp-checkbox--input:focus + .sp-checkbox .sp-checkbox--check) {
			box-shadow: 0px 0px 0px 2px $color--beige,
				0px 0px 0px 3px $color--beige-darkest;
		}
	}
</style>
