<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
		color?: BadgeColors;
		flat?: boolean;
		children?: Snippet;
	};
	export type BadgeColors = 'yellow' | 'blue' | 'pink' | 'green';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	let { color = 'yellow', flat, children, ...attr } = $props<BadgeProps>();
</script>

<span
	{...attr}
	class="sp-badge sp-badge--{color}"
	class:sp-badge--flat={flat}>
	{#if children}
		{@render children()}
	{/if}
</span>
