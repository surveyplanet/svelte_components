<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type PopoverProps = HTMLAttributes<HTMLDivElement> & {
		visible: boolean;
		children: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	let { visible = false, children, ...attr }: PopoverProps = $props();

	let popoverEl: HTMLDivElement | undefined = $state();

	function animate(node: HTMLDivElement, { delay = 0, duration = 400 }) {
		return {
			delay,
			duration,
			css: (t: number) => {
				return `opacity: ${t}; transform: perspective(60em) rotateX(${18 * (1 - t)}deg);`;
			},
			easing: cubicOut,
		};
	}

	// KEEP POPOVER INSIDE THE WINDOW

	// $effect(() => {
	// 	if (visible) {
	// 		adjustPosition(popoverEl);
	// 	}
	// });

	// function adjustPosition(element: HTMLElement) {
	// 	const rect = element.getBoundingClientRect();

	// 	// Check if the element goes outside the right edge of the window
	// 	if (rect.right > window.innerWidth) {
	// 		element.style.left = `${window.innerWidth - rect.width}px`;
	// 	}

	// 	// Check if the element goes outside the bottom edge of the window
	// 	if (rect.bottom > window.innerHeight) {
	// 		element.style.top = `${window.innerHeight - rect.height}px`;
	// 	}

	// 	// Check if the element goes outside the left edge of the window
	// 	if (rect.left < 0) {
	// 		element.style.left = '0px';
	// 	}

	// 	// Check if the element goes outside the top edge of the window
	// 	if (rect.top < 0) {
	// 		element.style.top = '0px';
	// 	}
	// }

	function onDocumentMouseDown(event: MouseEvent) {
		if (visible && popoverEl) {
			const compPath = event.composedPath();
			let clickOutside = !compPath.includes(popoverEl);

			if (clickOutside) {
				visible = false;
			}
		}
	}
</script>

<svelte:document onmousedown={onDocumentMouseDown} />

{#if visible}
	<div
		{...attr}
		class="sp-popover"
		bind:this={popoverEl}
		in:animate={{}}
		out:animate={{}}
		{...attr}>
		{#if children}
			{@render children()}
		{/if}
	</div>
{/if}

<style lang="scss">
	@use '@surveyplanet/styles/src/functions.scss' as *;
	@use '@surveyplanet/styles/src/colors.scss' as *;
	@use '@surveyplanet/styles/src/effects.scss' as *;
	@use '@surveyplanet/styles/src/sizes.scss' as *;

	.sp-popover {
		position: absolute;
		width: px-to-rem(450);
		height: auto;
		z-index: 1000;

		background: $color--white;
		box-shadow: $shadow--default;
		border-radius: $size-radius--large;
		padding: $size-space--l;

		transform-origin: top;
		overflow: hidden;
	}
</style>
