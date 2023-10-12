<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Icon } from './';

	const dispatchOpen = createEventDispatcher<{ open: undefined }>();
	const dispatchClose = createEventDispatcher<{ close: undefined }>();
	const dispatchIn = createEventDispatcher<{ in: undefined }>();
	const dispatchOut = createEventDispatcher<{ out: undefined }>();

	export let title = 'Modal';
	export let subtitle = 'Subtitle';
	export let fullscreen = false;
	export let overlay = true;
	export let visible = false;
	export let animationMilliseconds = 350;
	export let size: 'small' | 'medium' | 'large' = 'medium';

	const modalOpened = () => {
		dispatchOpen('open');
	};

	const modalIn = () => {
		dispatchIn('in');
	};

	const modalOut = () => {
		dispatchOut('out');
	};

	const modalClosed = () => {
		dispatchClose('close');
	};

	const overlayClickHandler = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			visible = false;
		}
	};

	const closeHandler = () => {
		visible = false;
	};
</script>

<svelte:window on:keydown={overlayClickHandler} />

{#if overlay && visible}
	<div
		role="button"
		tabindex="0"
		class="sp-modal--overlay"
		transition:fade
		on:click={closeHandler}
		on:keydown={overlayClickHandler} />
{/if}
{#if visible}
	<div
		transition:fly={{
			y: -250,
			duration: animationMilliseconds,
			easing: cubicOut,
		}}
		class="sp-modal sp-modal--{size}"
		on:introstart={modalOpened}
		on:introend={modalIn}
		on:outrostart={modalOut}
		on:outroend={modalClosed}
		class:sp-modal--fullscreen={fullscreen}>
		<button
			on:click={closeHandler}
			class="sp-modal--header--close-btn">
			<Icon
				name="x"
				strokeWidth={3}
				size={16} />
		</button>
		<header class="sp-modal--header">
			{#if title?.length}
				<h3 class="sp-modal--header--title">{title}</h3>
			{/if}
			{#if subtitle?.length}
				<h4 class="sp-modal--header--subtitle">{subtitle}</h4>
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
	$small-width: $size--256;
	$medium-width: $size--256 * 2;
	$large-width: $size--256 * 3;

	.sp-modal--overlay {
		z-index: 999;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: $color--beige;
		opacity: 0.8;
	}

	.sp-modal {
		z-index: 1000;
		position: absolute;
		padding: $size-gutter;
		width: $medium-width;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font: $font--default;
		border-radius: $size-radius--large;
		box-shadow: 0px 1px 6px rgba(22, 33, 55, 0.15);
		background-color: $color--white;

		&.sp-modal--small {
			width: $small-width;
		}
		&.sp-modal--large {
			width: $large-width;
		}
	}

	h3.sp-modal--header--title {
		font-size: $font-size--20;
		font-weight: $font-weight--bold;
		margin: 0;
		margin-bottom: $size-gutter--half;
		padding: 0;
	}

	h4.sp-modal--header--subtitle {
		font-size: $font-size--16;
		font-weight: $font-weight--normal;
		color: $color--beige-darkest;
		margin: 0;
		margin-bottom: $size-gutter--half;
	}

	.sp-modal--body {
		position: relative;
	}

	.sp-modal--footer {
		position: relative;
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
		cursor: pointer;
		position: absolute;
		right: $size-gutter--half;
		top: $size-gutter--half;
		width: $size--16;
		height: $size--16;
		// line-height: $size--20;
		padding: 0;
		margin: 0;
		border: 0;
		background-color: transparent;
		border-radius: $size-radius--small;
		&:hover {
			background-color: $color--beige-darker;
			:global(.sp-icon path) {
				stroke: $color--white;
			}
		}
	}
</style>
