<script lang="ts">
	// import '@surveyplanet/styles';
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
	export let icon: string | null;
	/**
	 * The button mode, either: 'primary', 'secondary' or 'tertiary'
	 */
	export let mode: BUTTON_MODES = BUTTON_MODES.SECONDARY;
</script>

<button
	type="button"
	class="sp-button sp-button--{mode} sp-button--{size}"
	class:loader
	{disabled}
	on:click={clickHandler}>
	<span class="sp-button--text"> {label}</span>
	{#if icon && icon.length}
		<span class="sp-button--icon">
			<Icon
				name={icon}
				size={size !== BUTTON_SIZES.MEDIUM
					? size === BUTTON_SIZES.LARGE
						? 24
						: 16
					: 20} />
		</span>
	{/if}
</button>

<style lang="scss">
	@use 'sass:color';
	$color--primary: #ffe978;
	$color--secondary: #a185e7;
	$color--tertiary: #a1fda5;
	$color--black: #262b35;
	$height: 35px;
	$height--small: 26px; // round($height * 0.75);;
	$height--large: 44px; // round($height + ($height * 0.25));;

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
		background-color: $color--secondary;
		color: $color--black;

		display: flex;
		justify-content: center;
		align-items: center;

		&.sp-button--text {
			// this should work, but it doesn't
			margin-right: 1rem;
			display: inline-block;
		}
		& span {
			display: inline-block;
		}
		&:focus {
			outline: none;
			box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
		}
		&:hover {
			background-color: $color--black;
			color: white;
		}
		&.sp-button--primary {
			color: $color--black;
			background-color: $color--primary;
			&:hover {
				background-color: $color--black;
				color: white;
			}
		}
		&.sp-button--tertiary {
			background-color: $color--tertiary;
			&:hover {
				background-color: $color--black;
				color: white;
			}
		}
		&.sp-button--small {
			font-size: 12px;
			padding: 0 $height--small - 10px;
			height: $height--small;
			line-height: $height--small;
		}
		&.sp-button--large {
			font-size: 16px;
			padding: 0 $height--large - 10px;
			height: $height--large;
			line-height: $height--large;
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
				border-top: 2px solid $color--black;
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
				background-color: $color--primary !important;
			}
			&.sp-button--primary:before {
				background-color: $color--primary !important;
			}
			&.sp-button--primary:after {
				border-color: mix(white, $color--primary, 85%);
				border-top-color: mix(black, $color--primary, 45%);
			}
			// secondary loader
			&.sp-button--secondary {
				background-color: $color--secondary !important;
			}
			&.sp-button--secondary:before {
				background-color: $color--secondary !important;
			}
			&.sp-button--secondary:after {
				border-color: mix(white, $color--secondary, 85%);
				border-top-color: mix(black, $color--secondary, 45%);
			}
			&.sp-button--tertiary {
				background-color: $color--tertiary !important;
			}
			&.sp-button--tertiary:before {
				background-color: $color--tertiary !important;
			}
			&.sp-button--tertiary:after {
				border-color: mix(white, $color--tertiary, 85%);
				border-top-color: mix(black, $color--tertiary, 45%);
			}
		}
	}
</style>
