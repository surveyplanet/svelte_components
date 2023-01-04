<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { BUTTON_MODES, BUTTON_SIZES } from './_definitions';

	import Icon from './Icon.svelte';

	const SP_BUTTON_CLICK_EVENT: string = 'SurveyPlanetButtonClickEvent';

	const dispatch = createEventDispatcher();

	/**
	 * Optional click handler
	 */
	const clickHandler = (event: MouseEvent): void => {
		dispatch(SP_BUTTON_CLICK_EVENT, event);
	};

	/**
	 * The button mode, either: 'primary', 'secondary' or 'tertiary'
	 */
	export let mode: BUTTON_MODES | string = BUTTON_MODES.SECONDARY;

	/**
	 * Whether the button is disabled or not
	 */
	export let disabled: boolean = false;

	/**
	 * Whether the button should show a loader when disabled
	 */
	export let loader: boolean = false;

	/**
	 * Whether the left and right edges should be rounded off
	 */
	export let round: boolean = false;

	/**
	 * The button size, either: 'small', 'medium' or 'large'
	 */
	export let size: BUTTON_SIZES | string = BUTTON_SIZES.MEDIUM;

	/**
	 * The button label
	 */
	export let label: string = '';

	/**
	 * The name of the icon to use inside the button
	 */
	export let icon: string | null;

	let iconSize: 16 | 20 | 24 =
		size !== BUTTON_SIZES.MEDIUM
			? size === BUTTON_SIZES.LARGE
				? 24
				: 16
			: 20;
</script>

<button
	type="button"
	class="sp-button sp-button--{mode} sp-button--{size}"
	class:loader
	class:round
	{disabled}
	on:click={clickHandler}>
	{#if label && label.length}
		<span class="sp-button--text">{label}</span>
	{/if}
	{#if icon && icon.length}
		<Icon
			name={icon}
			size={iconSize} />
	{/if}
</button>

<style lang="scss">
	@use 'sass:color';
	@use '@surveyplanet/styles' as *;
	@include spin(); // spin animation

	.sp-button {
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		column-gap: 0.25rem; // this should change depending on the size of the button
		height: $size-gutter;
		padding: 0 $size-gutter--half;
		border: 0;
		border-radius: 5px;
		font: $font--default;
		background-color: $color--purple;
		color: $color--dark;
		&:focus {
			outline: none;
			box-shadow: inset 0 0 3px $color--purple-lightest;
		}
		&:hover {
			background-color: $color--purple-dark;
		}
		&.round {
			border-radius: $size-gutter;
		}

		&.sp-button--secondary {
			background-color: $color--yellow;
			&:hover {
				background-color: $color--yellow-dark;
			}
		}
		&.sp-button--tertiary {
			background-color: $color--green;
			&:hover {
				background-color: $color--green-dark;
			}
		}
		&.sp-button--quaternary {
			background-color: $color--blue;
			&:hover {
				background-color: $color--blue-dark;
			}
		}
		&.sp-button--dark {
			background-color: $color--dark;
			color: $color--light;
			&:hover {
				background-color: $color--light;
				color: $color--dark;
			}
		}
		&.sp-button--small {
			font-size: $font-size--12;
			padding: 0 $size-gutter--half;
			height: $size-gutter - 0.5rem;
			column-gap: 0.125rem;
		}
		&.sp-button--large {
			font-size: $font-size--16;
			padding: 0 $size-gutter;
			height: $size-gutter + 1rem;
			column-gap: 0.5rem;
		}
		&:disabled:not(.loader) {
			color: $color--purple-light;
			background-color: $color--purple-lighter;
			cursor: default !important;
		}
		&.loader {
			position: relative;
			transition: none;
			.sp-button--text,
			:global(.sp-icon) {
				visibility: hidden;
				opacity: 0;
			}
			&:after {
				content: '';
				position: absolute;
				display: none; // hide loader when not disabled
				width: 14px;
				height: 14px;
				top: calc(50% - 9px);
				left: calc(50% - 8px);
				border: 2px solid #fff;
				border-top: 2px solid $color--dark;
				border-radius: 100%;
				animation: spin 1s linear infinite;
			}
			&:disabled {
				cursor: default !important;
				&:after {
					display: block; // show loader when disabled
				}
			}
			&.sp-button--small:after {
				width: 12px;
				height: 12px;
				top: calc(50% - 8px);
				left: calc(50% - 6px);
				border-width: 2px;
			}
			&.sp-button--large:after {
				width: 18px;
				height: 18px;
				top: calc(50% - 11px);
				left: calc(50% - 9px);
			}
		}
	}
</style>
