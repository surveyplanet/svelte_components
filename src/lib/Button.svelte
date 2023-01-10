<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';
	import { BUTTON_MODES, BUTTON_SIZES } from './_definitions';

	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

	/**
	 * A Button Component
	 * @component
	 */

	/**
	 * The button mode. See BUTTON_MODES.
	 */
	export let mode: BUTTON_MODES = BUTTON_MODES.PRIMARY;

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
	 * Whether the button should consume all available horizontal space.
	 */
	export let block: boolean = false;

	/**
	 * The button size, either: 'small', 'medium' or 'large'
	 * @required
	 */
	export let size: BUTTON_SIZES = BUTTON_SIZES.MEDIUM;

	/**
	 * The button label
	 * @required
	 */
	export let label: string = '';

	/**
	 * The name of the icon to use inside the button
	 */
	export let icon: string | undefined | null = undefined;

	/**
	 * The size of the icon is not configurable, it is dependant on the button size
	 */
	const iconSize: 16 | 20 | 24 = (() => {
		switch (size) {
			case BUTTON_SIZES.LARGE:
				return 24;
			case BUTTON_SIZES.MEDIUM:
				return 20;
			case BUTTON_SIZES.SMALL:
				return 16;
		}
	})();

	let clickAnimationEl: HTMLElement;

	/**
	 * Whether or not the button is in a depressed (mousedown) state.
	 */
	let active: boolean = false;

	const clickHandler = (e: MouseEvent): void => {
		dispatch('clickEvent', e);
	};

	const mouseUpHandler = (e: MouseEvent): void => {
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
		let w = clickAnimationEl.offsetWidth * 0.5;
		let h = clickAnimationEl.offsetHeight * 0.5;
		clickAnimationEl.style.left = `${mouseX - w}px`;
		clickAnimationEl.style.top = `${mouseY - h}px`;
		active = true;
	};
</script>

<button
	type="button"
	class="sp-button sp-button--{mode} sp-button--{size}"
	class:sp-button--action={icon && (!label || !label.length)}
	class:sp-button--round={round}
	class:sp-button--loader={loader}
	class:sp-button--active={active}
	class:sp-button--block={block}
	{disabled}
	on:click={clickHandler}
	on:mouseup={mouseUpHandler}
	on:mousedown={mouseDownHandler}>
	<span
		class="sp-button--active-animation"
		bind:this={clickAnimationEl}
		in:fade={{
			duration: 250,
			delay: 1,
			easing: sineOut,
		}}
		out:fade={{
			duration: 250,
			easing: sineOut,
		}} />

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
	@use '@surveyplanet/styles' as *;
	$anim--hover-speed: 250ms;
	$anim--active-speed: 250ms;
	$anim--active-size: px-to-rem(150);

	@include spin(); // loader animation
	@include fadeInOut(); // click animation

	.sp-button {
		position: relative;
		overflow: hidden;
		cursor: pointer;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		column-gap: $size--6; // this should change depending on the size of the button
		height: $size--40;
		padding: 0 $size--20;
		border: 0;
		border-radius: 5px;
		font: $font--default;
		background-color: $color--purple;
		color: $color--slate-dark;
		&:before {
			@include pseudo();
			z-index: 0;
			width: 150%;
			height: 100%;
			background-image: linear-gradient(
				90deg,
				$color--purple-dark 75%,
				transparent 100%
			);
			opacity: 0;
			transform: translateX(-100%);
			transition-timing-function: ease-out;
			transition: transform $anim--hover-speed, opacity $anim--hover-speed;
		}

		&:hover {
			&:before {
				opacity: 1;
				transform: translateX(0);
			}
		}

		&:focus {
			outline: none;
			// box-shadow: inset 0px 0px 3px 2px $color--blue;
		}

		&.sp-button--block {
			display: flex;
			width: 100%;
		}

		&.sp-button--round {
			border-radius: $size-gutter;
		}

		&.sp-button--action {
			width: $size--32;
			height: $size--32;
			padding: 0;
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

			.sp-button--active-animation {
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

			.sp-button--active-animation {
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

			.sp-button--active-animation {
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
				fill: white;
			}

			&:before {
				background-image: linear-gradient(
					90deg,
					#454d5f 75%,
					#454d5f 100%
				);
			}

			&:hover {
				:global(svg path) {
					fill: $color--slate-dark;
				}
			}

			.sp-button--active-animation {
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

			.sp-button--active-animation {
				display: none;
			}
		}
		&.sp-button--small {
			font-size: $font-size--12;
			padding: 0 $size-gutter--half;
			height: $size--24;
			column-gap: $size--2;
			&.sp-button--action {
				width: $size--24;
				height: $size--24;
				padding: 0;
			}
		}
		&.sp-button--large {
			font-size: $font-size--16;
			padding: 0 $size-gutter;
			height: $size--48;
			column-gap: $size--8;
			&.sp-button--action {
				width: $size--48;
				height: $size--48;
				padding: 0;
			}
		}
		&:disabled:not(.sp-button--loader) {
			cursor: default !important;
			color: $color--purple-light;
			background: $color--light-purple;
			:global(svg path) {
				fill: $color--purple-light;
			}

			&:before {
				background: unset;
				background-image: unset;
			}

			&.sp-button--secondary {
				color: $color--yellow-dark;
				background-color: $color--yellow-light;
				:global(svg path) {
					fill: $color--yellow-dark;
				}
			}
			&.sp-button--tertiary {
				color: $color--green-dark;
				background-color: $color--green-light;
				:global(svg path) {
					fill: $color--green-dark;
				}
			}
			&.sp-button--quaternary {
				color: $color--blue-dark;
				background-color: $color--blue-light;
				:global(svg path) {
					fill: $color--blue-dark;
				}
			}
			&.sp-button--dark {
				color: $color--slate;
				background-color: $color--slate-lighter;
				:global(svg path) {
					fill: $color--slate;
				}
			}
			&.sp-button--light {
				color: $color--slate-lighter;
				background-color: $color--white;
				box-shadow: inset 0px 0px 0px 1px $color--slate-lighter;
				:global(svg path) {
					fill: $color--slate-lighter;
				}
			}
		}
		&.sp-button--loader {
			position: relative;
			transition: none;

			// hide the text/icon so only spinner is seen
			&:disabled {
				.sp-button--text,
				:global(.sp-icon) {
					visibility: hidden;
					opacity: 0;
				}
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

		.sp-button--text,
		:global(.sp-icon) {
			position: relative;
			z-index: 1;
		}

		.sp-button--active-animation {
			position: absolute;
			z-index: 0;
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
			.sp-button--active-animation {
				transform: scale(1);
				opacity: 1;
			}
		}
	}
</style>
