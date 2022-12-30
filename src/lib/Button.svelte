<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	enum BUTTON_SIZES {
		SMALL = 'small',
		MEDIUM = 'medium',
		LARGE = 'large',
	}

	enum BUTTON_MODES {
		PRIMARY = 'primary',
		SECONDARY = 'secondary',
		TERTIARY = 'tertiary',
	}

	const SP_BUTTON_CLICK_EVENT: string = 'SurveyPlanetButtonClickEvent';

	const dispatch = createEventDispatcher();

	/**
	 * Optional click handler
	 */
	const clickHandler = (event: MouseEvent): void => {
		// console.log('click');

		dispatch(SP_BUTTON_CLICK_EVENT, event);
	};

	/**
	 * The button mode, either: 'primary', 'secondary' or 'tertiary'
	 */
	export let mode: BUTTON_MODES = BUTTON_MODES.SECONDARY;

	/**
	 * Whether the button is disabled or not
	 */
	export let disabled: boolean = false;

	/**
	 * Whether the button should show a loader when disabled
	 */
	export let loader: boolean = false;

	/**
	 * The button size, either: 'small', 'medium' or 'large'
	 */
	export let size: BUTTON_SIZES = BUTTON_SIZES.MEDIUM;

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
	{disabled}
	on:click={clickHandler}>
	{#if label && label.length}
		<span class="sp-button--text">{label}</span>
	{/if}
	{#if icon && icon.length}
		<span class="sp-button--icon">
			<Icon
				name={icon}
				size={iconSize}
				debug="true" />
		</span>
	{/if}
</button>

<style lang="scss">
	@use 'sass:color';
	@use '@surveyplanet/styles' as *;
	// $color--yellow: #ffe978;
	// $color--purple: #a185e7;
	// $color--green: #a1fda5;
	// $color--dark: #262b35;
	$height: 34px;
	$height--small: 28px;
	$height--large: 44px;

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.sp-button {
		font-family: 'Suisse Intl', 'Helvetica Neue', Helvetica, Arial,
			sans-serif;
		font-weight: normal;
		border: 0;
		border-radius: 3em;
		cursor: pointer;
		display: inline-block;
		height: $height;
		padding: 0 $height - 10px;
		font-size: 14px;
		background-color: $color--purple;
		color: $color--dark;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: $font-family--default;
		font: $font--xsmall-bold;

		& span {
			display: inline-block;
		}

		.sp-button--text {
			& + .sp-button--icon {
				margin-left: 10px; // this should change depending on the size of the button
			}
		}

		&:focus {
			outline: none;
			box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
		}
		&:hover {
			background-color: $color--dark;
			color: white;
		}
		&.sp-button--primary {
			color: $color--dark;
			background-color: $color--yellow;
			&:hover {
				background-color: $color--dark;
				color: white;
			}
		}
		&.sp-button--tertiary {
			background-color: $color--green;
			&:hover {
				background-color: $color--dark;
				color: white;
			}
		}
		&.sp-button--small {
			font-size: 12px;
			padding: 0 $height--small - 10px;
			height: $height--small;
		}
		&.sp-button--large {
			font-size: 16px;
			padding: 0 $height--large - 10px;
			height: $height--large;
		}
		&:disabled {
			color: gray !important;
			background-color: lightgray !important;
			cursor: default !important;
			transition: background-color 25ms 500ms;
		}

		&.loader {
			position: relative;
			transition: none;
			&:before,
			&:after {
				content: '';
				position: absolute;
				display: none; // hide loader when not disabled
			}
			&:after {
				width: 14px;
				height: 14px;
				top: calc(50% - 9px);
				left: calc(50% - 8px);
				border: 2px solid #fff;
				border-top: 2px solid $color--dark;
				border-radius: 100%;
				animation: spin 1s linear infinite;
			}
			&:before {
				background-color: rgba(255, 166, 0, 0.5);
				left: 18px;
				right: 18px;
				top: 0;
				bottom: 0;
			}

			&:disabled:before,
			&:disabled:after {
				display: block; // show loader when disabled
			}

			&.sp-button--small:before {
				left: 12px;
				right: 12px;
			}
			&.sp-button--large:before {
				left: 30px;
				right: 30px;
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
			// primary loader
			&.sp-button--primary {
				background-color: $color--yellow !important;
			}
			&.sp-button--primary:before {
				background-color: $color--yellow !important;
			}
			&.sp-button--primary:after {
				border-color: mix(white, $color--yellow, 85%);
				border-top-color: mix(black, $color--yellow, 45%);
			}
			// secondary loader
			&.sp-button--secondary {
				background-color: $color--purple !important;
			}
			&.sp-button--secondary:before {
				background-color: $color--purple !important;
			}
			&.sp-button--secondary:after {
				border-color: mix(white, $color--purple, 85%);
				border-top-color: mix(black, $color--purple, 45%);
			}
			&.sp-button--tertiary {
				background-color: $color--green !important;
			}
			&.sp-button--tertiary:before {
				background-color: $color--green !important;
			}
			&.sp-button--tertiary:after {
				border-color: mix(white, $color--green, 85%);
				border-top-color: mix(black, $color--green, 45%);
			}
		}
	}
</style>
