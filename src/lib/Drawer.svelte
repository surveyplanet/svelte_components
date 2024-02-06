<script
	context="module"
	lang="ts">
	import type { Snippet } from 'svelte';

	export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

	export interface DrawerProps {
		open: boolean;
		duration: number;
		placement: DrawerPlacement;
		size: string;
		children: Snippet;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	let { open, duration, placement, size, children } = $props<DrawerProps>();

	let mounted = $state(false);

	let style = $derived(`--duration: ${duration}s; --size: ${size};`);

	function scrollLock() {
		if (mounted) {
			const body = document.querySelector<HTMLBodyElement>('body');
			body!.style.overflow = open ? 'hidden' : 'auto';
		}
	}

	// function overlayClickHandler() {
	// 	console.log('overlayClickHandler', open);
	// }

	$effect(() => {
		scrollLock(open);
	});

	onMount(() => {
		mounted = true;
	});
</script>

<aside
	class="sp-drawer"
	class:open
	{style}>
	<div class="sp-drawer--overlay" />
	<!--onclick={overlayClickHandler} -->

	<div
		class="sp-drawer--panel {placement}"
		class:size>
		{#if children}
			{@render children()}
		{/if}
	</div>
</aside>

<style>
	.sp-drawer {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: -1;
		transition: z-index var(--duration) step-end;
	}

	.sp-drawer.open {
		z-index: 99;
		transition: z-index var(--duration) step-start;
	}

	.sp-drawer--overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(100, 100, 100, 0.5);
		opacity: 0;
		z-index: 2;
		transition: opacity var(--duration) ease;
	}

	.sp-drawer.open .sp-drawer--overlay {
		opacity: 1;
	}

	.sp-drawer--panel {
		position: fixed;
		width: 100%;
		height: 100%;
		background: white;
		z-index: 3;
		transition: transform var(--duration) ease;
		overflow: auto;
	}

	.sp-drawer--panel.left {
		left: 0;
		transform: translate(-100%, 0);
	}

	.sp-drawer--panel.right {
		right: 0;
		transform: translate(100%, 0);
	}

	.sp-drawer--panel.top {
		top: 0;
		transform: translate(0, -100%);
	}

	.sp-drawer--panel.bottom {
		bottom: 0;
		transform: translate(0, 100%);
	}

	.sp-drawer--panel.left.size,
	.sp-drawer--panel.right.size {
		max-width: var(--size);
	}

	.sp-drawer--panel.top.size,
	.sp-drawer--panel.bottom.size {
		max-height: var(--size);
	}

	.sp-drawer.open .sp-drawer--panel {
		transform: translate(0, 0);
	}
</style>
