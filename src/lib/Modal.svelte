<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { COLORS, Icon } from './';

	const dispatch = createEventDispatcher();
	/**
	 * Main modal title.
	 */
	export let title = 'Modal';
	/**
	 * Modal subtitle.
	 */
	export let subtitle = 'Subtitle';
	/**
	 * Whether the modal should be fullscreen.
	 */
	export let fullscreen = false;
	/**
	 * Whether should should be a transparent
	 * background element which prevents interaction
	 * with other elements on the stage.
	 */
	export let overlay = true;

	export let visible = false;

	export let animationMilliseconds = 350;
	// TODO: add support for different sizes
	export let size: 'small' | 'medium' | 'large' = 'medium';

	const modalOpened = () => {
		dispatch('open');
	};

	const modalIn = () => {
		dispatch('in');
	};

	const modalOut = () => {
		dispatch('out');
	};

	const modalClosed = () => {
		dispatch('close');
	};

	const clickableOverlayHandler = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			visible = false;
		}
	};

	const closeHandler = () => {
		visible = false;
	};
</script>

<svelte:window on:keydown={clickableOverlayHandler} />
{#if overlay && visible}
	<div
		class="sp-modal--overlay--background"
		data-testid="overlay"
		transition:fade
		on:click={closeHandler}
		on:keydown={clickableOverlayHandler} />
{/if}
{#if visible}
	<div
		transition:fly={{
			y: -250,
			duration: animationMilliseconds,
			easing: cubicOut,
		}}
		class="sp-modal sp-modal--{size}"
		data-testid="modal"
		on:introstart={modalOpened}
		on:introend={modalIn}
		on:outrostart={modalOut}
		on:outroend={modalClosed}
		class:sp-modal--fullscreen={fullscreen}
		class:sp-modal--overlay={overlay}>
		<header class="sp-modal--header">
			<button
				on:click={closeHandler}
				class="sp-modal--header--close-btn">
				<Icon
					color={COLORS.slate}
					name="x"
					size={20} />
			</button>
			{#if title?.length}
				<h2 class="sp-modal--header--title">{title}</h2>
			{/if}
			{#if subtitle?.length}
				<h3 class="sp-modal--header--subtitle">{subtitle}</h3>
			{/if}
			<slot name="header" />
		</header>

		<div class="sp-modal--body">
			<slot
				name="body"
				class="hugo" />
		</div>
		<footer class="sp-modal--footer">
			<slot name="footer" />
		</footer>
	</div>
{/if}

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	$animation-speed: 300ms;

	.sp-modal {
		z-index: 1000;
		padding: $size-gutter;
		position: absolute;
		border: 1px solid $color--slate-dark;
		border-radius: $size-radius--default;
		box-shadow: 0px 0px 25px 0px rgba(0, 0, 0, 0.25);
		font: $font--default;
		background-color: $color--white;
	}
	.sp-modal--header {
		position: relative;
	}

	.sp-modal--body {
		position: relative;
	}

	.sp-modal--footer {
		position: relative;
	}

	.sp-modal--overlay {
		z-index: 999;
		opacity: 0.8;
	}

	.sp-modal--fullscreen {
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
		border-radius: 0;
		box-shadow: none;
	}

	.sp-modal--header--close-btn {
		position: absolute;
		right: -($size-gutter--half);
		top: -($size-gutter--half);
		cursor: pointer;
		width: $size--20;
		height: $size--20;
		line-height: $size--20;
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
	}

	.sp-modal--small {
		min-width: 300px;
		min-height: 300px;
	}
	.sp-modal--medium {
		min-width: 500px;
		min-height: 500px;
	}
	.sp-modal--large {
		min-width: 700px;
		min-height: 700px;
	}

	.sp-modal--overlay--background {
		z-index: 998;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: $color--slate-dark;
		opacity: 0.6;
	}
</style>
