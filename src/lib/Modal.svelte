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
