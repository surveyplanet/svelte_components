<script
	lang="ts"
	context="module">
	export const BUTTON_MODES = {
		PRIMARY: 'primary',
		SECONDARY: 'secondary',
		TERTIARY: 'tertiary',
		QUATERNARY: 'quaternary',
		DARK: 'dark',
		LIGHT: 'light',
	} as Record<string, string>;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatchClick = createEventDispatcher<{ detail: MouseEvent }>();

	/**
	 * A Button Component
	 * @component
	 */

	/**
	 * The button mode. See BUTTON_MODES.
	 */
	export let mode = BUTTON_MODES.PRIMARY;

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
	export let round = false;

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

	let clickAnimationEl: HTMLElement;

	/**
	 * Whether or not the button is in a depressed (mousedown) state.
	 */
	let active = false;

	const clickHandler = (e: MouseEvent): void => {
		dispatchClick('click', e);
	};

	const mouseUpHandler = (): void => {
		deactivate();
	};
	const mouseDownHandler = (e: MouseEvent): void => {
		const target = e.target as Element;
		const btn = target.closest('button') as Element;
		const rect = btn.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		activate(x, y);
	};

	const deactivate = () => {
		active = false;
	};

	const activate = (mouseX: number, mouseY: number) => {
		active = true;
		let w = clickAnimationEl.offsetWidth * 0.5;
		let h = clickAnimationEl.offsetHeight * 0.5;
		clickAnimationEl.style.left = `${mouseX - w}px`;
		clickAnimationEl.style.top = `${mouseY - h}px`;
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
	class:sp-button--active={active}
	class:sp-button--block={block}
	class:sp-button--action={action}
	on:click={clickHandler}
	on:mouseup={mouseUpHandler}
	on:mousedown={mouseDownHandler}>
	<span
		class="sp-button--ripple"
		aria-hidden="true"
		bind:this={clickAnimationEl} />

	<span class="sp-button--label"><slot /></span>
</button>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	$anim--hover-speed: 500ms;
	$anim--active-speed: 150ms;
	$anim--active-size: px-to-rem(150);

	@include spin(); // loader animation
	@include fade-in-out(); // click animation

	.sp-button {
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		display: inline-block;
		height: $size--40;
		padding: 1px $size--20 0;
		border: 0;
		border-radius: 5px;
		font: $font--default;
		background-color: $color--purple;
		color: $color--slate-dark;

		// Change icon color and size at component level
		// :global(svg) {width: 20px; height: 20px; }
		// :global(svg path) {stroke: $color--slate-dark;}

		// hover state
		&:before {
			@include pseudo();
			z-index: 0;
			width: 150%;
			height: 100%;
			top: 0;
			left: 0;
			background-image: linear-gradient(
				90deg,
				$color--purple-dark 75%,
				transparent 100%
			);
			opacity: 0;
			transform: translateX(-150%);
			transition-timing-function: ease-out;
			transition: transform $anim--hover-speed, opacity $anim--hover-speed;
		}

		&:hover {
			&:before {
				opacity: 1;
				transform: translateX(0);
			}
		}

		@include set-focus {
			border: 1px solid $color--slate-dark;
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

		&.sp-button--secondary {
			background-color: $color--yellow;

			&:before {
				background-image: linear-gradient(
					90deg,
					$color--yellow-dark 75%,
					transparent 100%
				);
			}

			.sp-button--ripple {
				background: $color--yellow;
				background: radial-gradient(
					circle,
					$color--yellow 0%,
					transparent 60%
				);
			}
		}
		&.sp-button--tertiary {
			background-color: $color--green;

			&:before {
				background-image: linear-gradient(
					90deg,
					$color--green-dark 75%,
					transparent 100%
				);
			}

			.sp-button--ripple {
				background: $color--green;
				background: radial-gradient(
					circle,
					$color--green 0%,
					transparent 60%
				);
			}
		}
		&.sp-button--quaternary {
			background-color: $color--blue;

			&:before {
				background-image: linear-gradient(
					90deg,
					$color--blue-dark 75%,
					transparent 100%
				);
			}

			.sp-button--ripple {
				background: $color--blue;
				background: radial-gradient(
					circle,
					$color--blue 0%,
					transparent 60%
				);
			}
		}
		&.sp-button--dark {
			background-color: $color--slate-dark;
			color: $color--slate-lighter;
			:global(svg path) {
				stroke: $color--slate-lighter;
			}

			&:before {
				background-image: linear-gradient(
					90deg,
					#454d5f 75%,
					#454d5f 100%
				);
			}

			.sp-button--ripple {
				background: radial-gradient(
					circle,
					$color--slate-dark 0%,
					transparent 60%
				);
			}
		}
		&.sp-button--light {
			background-color: $color--white;
			box-shadow: inset 0px 0px 0px 1px $color--slate-lighter;

			&:before {
				background: unset;
				background-image: unset;
			}

			&:hover {
				box-shadow: inset 0px 0px 0px 1px #c4c7cd;
			}

			&:active {
				box-shadow: inset 0px 0px 0px 1px $color--slate;
			}

			.sp-button--ripple {
				display: none;
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
		}
		&:disabled:not(.sp-button--loader) {
			cursor: default !important;
			color: $color--purple-light;
			background: $color--light-purple;
			:global(svg path) {
				stroke: $color--purple-light;
			}

			&:before {
				background: unset;
				background-image: unset;
			}

			&.sp-button--secondary {
				color: $color--yellow-dark;
				background-color: $color--yellow-light;
				:global(svg path) {
					stroke: $color--yellow-dark;
				}
			}
			&.sp-button--tertiary {
				color: $color--green-dark;
				background-color: $color--green-light;
				:global(svg path) {
					stroke: $color--green-dark;
				}
			}
			&.sp-button--quaternary {
				color: $color--blue-dark;
				background-color: $color--blue-light;
				:global(svg path) {
					stroke: $color--blue-dark;
				}
			}
			&.sp-button--dark {
				color: $color--slate;
				background-color: $color--slate-lighter;
				:global(svg path) {
					stroke: $color--slate;
				}
			}
			&.sp-button--light {
				color: $color--slate-lighter;
				background-color: $color--white;
				box-shadow: inset 0px 0px 0px 1px $color--slate-lighter;
				:global(svg path) {
					stroke: $color--slate-lighter;
				}
			}
		}
		&.sp-button--loader {
			position: relative;
			transition: none;

			// hide the text/icon so only spinner is seen
			&:disabled {
				.sp-button--label {
					visibility: hidden;
					opacity: 0;
				}
			}

			&:before {
				background: unset;
				background-image: unset;
			}

			&:after {
				content: '';
				box-sizing: border-box;
				position: absolute;
				display: none; // hide loader when not disabled
				width: $size--16;
				height: $size--16;
				top: calc(50% - 8px);
				left: calc(50% - 8px);
				border: 2px solid $color--slate-dark;
				border-top: 2px solid transparent;
				border-radius: 100%;
				animation: spin 1s linear infinite;
			}
			&:disabled {
				cursor: default !important;
				&:after {
					display: block; // show loader when disabled
				}
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

		.sp-button--ripple {
			position: absolute;
			z-index: 1;
			left: calc(50% - ($anim--active-size * 0.5));
			top: calc(50% - ($anim--active-size * 0.5));
			width: $anim--active-size;
			height: $anim--active-size;
			display: block;
			border-radius: $size--40;
			transform: scale(0.1);
			opacity: 0;
			background: $color--purple;
			background: radial-gradient(
				circle,
				$color--purple 50%,
				transparent 60%
			);
			transition-timing-function: ease-out;
			transition: transform $anim--active-speed,
				opacity $anim--active-speed;
		}

		&.sp-button--active {
			.sp-button--ripple {
				transform: scale(1);
				opacity: 1;
			}
		}
	}
</style>
