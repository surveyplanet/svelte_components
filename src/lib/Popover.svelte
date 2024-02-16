<script
	lang="ts"
	context="module">
	export interface PopoverProps {
		visible: boolean;
		children: Snippet;
		// rest?: Record<string, string>;
	}
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cubicOut } from 'svelte/easing';

	let { visible = false, children, ...rest } = $props<PopoverProps>();

	function animate(node: HTMLDivElement, { delay = 0, duration = 400 }) {
		return {
			delay,
			duration,
			css: (t: number) => {
				console.log(t);
				return `opacity: ${t}; transform: perspective(60em) rotateX(${18 * (1 - t)}deg); scaleY(${t});`;
			},
			easing: cubicOut,
		};
	}

	function onDocumentMouseDown() {
		if (visible) {
			visible = false;
		}
	}
</script>

<svelte:document onmousedown={onDocumentMouseDown} />

{#if visible}
	<div
		class="sp-popover"
		{...rest}
		in:animate={{}}
		out:animate={{}}>
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

		background: $color--white;
		box-shadow: $shadow--default;
		border-radius: $size-radius--large;
		padding: $size-space--l;

		transform-origin: top;
		overflow: hidden;
	}
</style>
