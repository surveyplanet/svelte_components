<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { create_in_transition } from 'svelte/internal';
	import { sineOut } from 'svelte/easing';
	import { BUTTON_MODES, BUTTON_SIZES } from './_definitions';

	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();

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
	export let icon: string | undefined | null = undefined;

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

	const clickHandler = (e: MouseEvent<HTMLElement>): void => {
		const target = e.target as Element;
		const btn = target.closest('button') as Element;
		const rect = btn.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		showClickAnimation(x, y);
		dispatch('clickEvent', e);
	};

	const clickTransition = (node: HTMLElement, options: object) => {
		return {
			duration: 250,
			css: (t: number, u: number) => {
				const value = t >= 0.5 ? u : t;
				const eased = sineOut(value);
				return `transform: scale(${eased})`;
			},
		};
	};

	const showClickAnimation = (mouseX: number, mouseY: number) => {
		let w = clickAnimationEl.offsetWidth * 0.5;
		let h = clickAnimationEl.offsetHeight * 0.5;

		clickAnimationEl.style.left = `${mouseX - w}px`;
		clickAnimationEl.style.top = `${mouseY - h}px`;

		create_in_transition(clickAnimationEl, clickTransition, {}).start();
	};
</script>

<button
	type="button"
	class="sp-button sp-button--{mode} sp-button--{size} 
	{icon && (!label || !label.length) ? 'sp-button--action' : ''}
	{round ? 'sp-button--round' : ''}"
	class:loader
	{disabled}
	on:click={clickHandler}>
	<span
		bind:this={clickAnimationEl}
		class="sp-button--click-animation" />

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
	$anim--hover-speed: 500ms;
	$anim--size: $size--256;

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
		transition: background-color $anim--hover-speed;
		&:focus {
			outline: none;
			// box-shadow: inset 0px 0px 3px 2px $color--blue;
		}
		&:hover {
			background: linear-gradient(90deg, $color--purple-dark, transparent)
				$color--purple-dark;
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
			&:hover {
				background: linear-gradient(
						90deg,
						$color--yellow-dark,
						transparent
					)
					$color--yellow-dark;
			}

			.sp-button--click-animation {
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
			&:hover {
				background: linear-gradient(
						90deg,
						$color--green-dark,
						transparent
					)
					$color--green-dark;
			}

			.sp-button--click-animation {
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
			&:hover {
				background: linear-gradient(
						90deg,
						$color--blue-dark,
						transparent
					)
					$color--blue-dark;
			}

			.sp-button--click-animation {
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
			color: $color--slate-light;
			:global(svg path) {
				fill: white;
			}
			&:hover {
				background: linear-gradient(90deg, $color--slate, transparent)
					$color--slate;
				:global(svg path) {
					fill: $color--slate-dark;
				}
			}

			.sp-button--click-animation {
				background: $color--slate-dark;
				background: radial-gradient(
					circle,
					$color--slate-dark 0%,
					transparent 60%
				);
			}
		}
		&.sp-button--light {
			background-color: $color--white;
			box-shadow: inset 0px 0px 0px 1px #c4c7cd;
			&:hover {
				background: $color--white;
				box-shadow: inset 0px 0px 0px 1px $color--slate;
			}

			.sp-button--click-animation {
				background: $color--slate-light;
				background: radial-gradient(
					circle,
					$color--slate-light 0%,
					transparent 60%
				);
			}
		}
		&.sp-button--small {
			font-size: $font-size--12;
			padding: 0 $size-gutter--half;
			height: $size--24;
			column-gap: $size--2;
		}
		&.sp-button--large {
			font-size: $font-size--16;
			padding: 0 $size-gutter;
			height: $size-gutter + 1rem;
			column-gap: $size--8;
		}
		&:disabled:not(.loader) {
			color: $color--purple-light;
			background: $color--light-purple;
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
				border-top: 2px solid $color--slate-dark;
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
	.sp-button--text,
	:global(.sp-icon) {
		position: relative;
		z-index: 1;
	}
	.sp-button--click-animation {
		position: absolute;
		z-index: 0;
		// left: calc(50% - ($anim--size * 0.5));
		// top: calc(50% - ($anim--size * 0.5));
		left: 0;
		top: 0;
		width: $anim--size;
		height: $anim--size;
		display: block;
		border-radius: $size--40;
		transform: scale(0);
		background: $color--purple;
		background: radial-gradient(circle, $color--purple 0%, transparent 60%);
	}
</style>
