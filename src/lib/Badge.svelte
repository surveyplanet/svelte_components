<script
	lang="ts"
	context="module">
	export type BadgeProps = {
		color?: BadgeColors;
		flat?: boolean;
		children?: Snippet;
	};
	export type BadgeColors = 'yellow' | 'blue' | 'pink' | 'green';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let { color = 'yellow', flat, children } = $props<BadgeProps>();
</script>

<span
	class="sp-badge sp-badge--{color}"
	class:sp-badge--flat={flat}>
	{#if children}
		{@render children()}
	{/if}
</span>
