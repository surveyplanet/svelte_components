<script
	lang="ts"
	context="module">
	export const BUTTON_MODES = {
		primary: 'primary',
		light: 'light',
		accent: 'accent',
		accent_alt_1: 'accent-alt1',
		accent_alt_2: 'accent-alt2',
		accent_alt_3: 'accent-alt3',
		outline: 'outline',
	} as Record<string, string>;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatchClick: (name: string, detail: MouseEvent) => boolean =
		createEventDispatcher();

	/**
	 * A Button Component
	 * @component
	 */

	/**
	 * The button mode. See BUTTON_MODES.
	 */
	export let mode = BUTTON_MODES.primary;

	/**
	 * Whether the button is disabled or not
	 */
	export let disabled = false;

	/**
	 * Whether the button should show a loader animation when disabled
	 */
	export let loader = false;

	/**
	 * Whether the left and right edges should be rounded off
	 */
	export let round = true;

	/**
	 * Whether the button should consume all available horizontal space.
	 */
	export let block = false;

	/**
	 * Whether the button should render as a square action button.
	 */
	export let action = false;

	/**
	 * The type of button
	 */
	export let type: 'button' | 'submit' | 'reset' = 'button';

	/**
	 * The id of a Form element to associate the button.
	 */
	export let form: string | null = null;

	/**
	 * The button size, either: 'small', 'medium' or 'large'
	 * @required
	 */
	export let size: 'small' | 'medium' | 'large' = 'medium';

	const clickHandler = (e: MouseEvent): void => {
		dispatchClick('click', e);
	};
</script>

<button
	{type}
	{disabled}
	{form}
	{...$$restProps}
	class="sp-button sp-button--{mode} sp-button--{size}"
	class:sp-button--round={round}
	class:sp-button--loader={loader}
	class:sp-button--block={block}
	class:sp-button--action={action}
	on:click={clickHandler}>
	<span class="sp-button--label"><slot /></span>
</button>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	// $anim--hover-speed: 5000ms;

	@include spin(); // loader animation
	@include fade-in-out(); // click animation

	.sp-button {
		position: relative;
		overflow: hidden;
		cursor: pointer;
		display: inline-block;
		height: $size--40;
		padding: 1px $size--20 0;
		border: 0;
		border-radius: 5px;
		font: $font--default;
		background-color: $color--darkest;
		color: $color--white;

		.sp-button--label {
			color: $color--white;
		}

		// Change icon color and size at component level
		// :global(svg) {width: 20px; height: 20px; }
		// :global(svg path) {stroke: $color--dark;}

		@include set-focus {
			box-shadow: 0px 0px 0px 2px $color--beige,
				0px 0px 0px 3px $color--darkest;
		}

		&:hover {
			background-color: $color--darker;
		}

		&:enabled:active {
			background-color: #56585a;
		}

		&:disabled:not(.sp-button--loader) {
			cursor: default !important;
			background-color: $color--beige-darker;
			.sp-button--label {
				color: $color--beige-darkest;
			}
			:global(svg path) {
				stroke: $color--beige-darkest;
			}

			&.sp-button--light {
				background-color: $color--beige;
				.sp-button--label {
					color: $color--beige-darker;
				}
			}
			&.sp-button--outline {
				box-shadow: inset 0px 0px 0px 1px $color--beige-darker;
				background-color: transparent;
				.sp-button--label {
					color: $color--beige-darker;
				}
			}
		}

		&.sp-button--light {
			background-color: $color--beige-dark;
			color: $color--darkest;
			.sp-button--label {
				color: $color--darkest;
				background: unset;
			}
			&:hover {
				background-color: $color--beige-darker;
			}

			&:enabled:active {
				background-color: $color--beige-darkest;
			}

			@include set-focus {
				box-shadow: 0px 0px 0px 2px $color--beige,
					0px 0px 0px 3px $color--beige-darker;
			}
		}
		// yellow gradient
		&.sp-button--accent {
			background-color: $color--yellow;
			background-image: $color--gradient--yellow;
			color: $color--darkest;
			.sp-button--label {
				color: $color--darkest;
			}
			&:hover {
				background-image: linear-gradient(
					180deg,
					$color--yellow-gradient-start 0%,
					$color--yellow-gradient-end 50%
				);
			}

			&:enabled:active {
				background-color: $color--yellow;
				background-image: unset;
			}
		}

		// blue gradient
		&.sp-button--accent-alt1 {
			background-color: $color--blue;
			background-image: $color--gradient--blue;
			color: $color--darkest;
			.sp-button--label {
				color: $color--darkest;
			}
			&:hover {
				background-image: linear-gradient(
					180deg,
					$color--blue-gradient-start 0%,
					$color--blue-gradient-end 50%
				);
			}

			&:enabled:active {
				background-color: $color--blue;
				background-image: unset;
			}
		}

		// green gradient
		&.sp-button--accent-alt2 {
			background-color: $color--green;
			background-image: $color--gradient--green;
			color: $color--darkest;
			.sp-button--label {
				color: $color--darkest;
			}
			&:hover {
				background-image: linear-gradient(
					180deg,
					$color--green-gradient-start 0%,
					$color--green-gradient-end 50%
				);
			}

			&:enabled:active {
				background-color: $color--green;
				background-image: unset;
			}
		}

		// pink gradient
		&.sp-button--accent-alt3 {
			background-color: $color--pink;
			background-image: $color--gradient--pink;
			color: $color--darkest;
			.sp-button--label {
				color: $color--darkest;
			}
			&:hover {
				background-image: linear-gradient(
					180deg,
					$color--pink-gradient-start 0%,
					$color--pink-gradient-end 50%
				);
			}

			&:enabled:active {
				background-color: $color--pink;
				background-image: unset;
			}
		}
		&.sp-button--outline {
			background-color: $color--white;
			box-shadow: inset 0px 0px 0px 1px $color--beige-darker;

			.sp-button--label {
				color: $color--darkest;
			}

			&:hover {
				box-shadow: inset 0px 0px 0px 1px $color--beige-darkest;
			}

			&:enabled:active {
				box-shadow: inset 0px 0px 0px 1px $color--beige-darkest;
			}

			@include set-focus {
				box-shadow: 0px 0px 0px 1px $color--beige-darker,
					0px 0px 0px 3px $color--beige,
					0px 0px 0px 4px $color--beige-darkest;
			}
		}

		&.sp-button--block {
			display: block;
			width: 100%;
		}

		&.sp-button--round {
			border-radius: $size-gutter;
		}

		&.sp-button--action {
			width: $size--32;
			height: $size--32;
			padding: 0;
			.sp-button--label {
				position: absolute;
				top: 0;
				right: 0;
				bottom: 0;
				left: 0;
			}
		}

		&.sp-button--small {
			font-size: $font-size--12;
			padding: 0 $size-gutter--half;
			height: $size--24;
			&.sp-button--action {
				width: $size--24;
				height: $size--24;
				padding: 0;
			}
			.sp-button--label {
				column-gap: $size--2;
			}

			:global(svg) {
				width: 16px;
				height: 16px;
			}
		}
		&.sp-button--large {
			font-size: $font-size--16;
			padding: 0 $size-gutter;
			height: $size--48;
			&.sp-button--action {
				width: $size--48;
				height: $size--48;
				padding: 0;
			}
			.sp-button--label {
				column-gap: $size--8;
			}
			:global(svg) {
				width: 24px;
				height: 24px;
			}

			// gradient text for large buttons
			// &.sp-button--primary {
			// 	.sp-button--label {
			// 		background: linear-gradient(
			// 			180deg,
			// 			$color--yellow-gradient-start 25%,
			// 			$color--yellow-gradient-end 75%
			// 		);
			// 		-webkit-background-clip: text;
			// 		background-clip: text;
			// 		color: transparent;
			// 	}
			// }
		}

		&.sp-button--loader {
			position: relative;
			transition: none;

			&:after {
				content: '';
				position: absolute;
				display: none; // hide loader when not disabled
				width: $size--16;
				height: $size--16;
				top: calc(50% - 8px);
				left: calc(50% - 8px);
				border: 2px solid $color--white;
				border-top: 2px solid transparent;
				border-radius: 100%;
				animation: spin 1s linear infinite;
			}

			// hide the text/icon so only spinner is seen
			&:disabled {
				cursor: default !important;

				.sp-button--label {
					visibility: hidden;
					opacity: 0;
				}

				&:after {
					display: block; // show loader when disabled
				}

				// &:enabled:active {
				// 	background-color: unset;
				// }
			}

			&.sp-button--dark:after {
				border-color: transparent $color--white $color--white;
			}

			&.sp-button--small:after {
				width: $size--12;
				height: $size--12;
				top: calc(50% - 6px);
				left: calc(50% - 6px);
			}

			&.sp-button--large:after {
				width: $size--18;
				height: $size--18;
				top: calc(50% - 9px);
				left: calc(50% - 9px);
			}

			&.sp-button--light:after,
			&.sp-button--accent:after,
			&.sp-button--accent-alt1:after,
			&.sp-button--accent-alt2:after,
			&.sp-button--accent-alt3:after,
			&.sp-button--outline:after {
				border-color: $color--darkest;
				border-top-color: transparent;
			}
		}

		.sp-button--label {
			display: flex;
			justify-content: center;
			align-items: center;
			column-gap: $size--6;
			position: relative;
			z-index: 2;
			&:empty {
				display: none;
			}
		}
	}
</style>
