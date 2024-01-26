<script
	lang="ts"
	context="module">
	export type BadgeProps = {
		color: 'yellow' | 'blue' | 'pink' | 'green';
		flat: boolean;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';

	let { color, flat, children } = $props<BadgeProps>();
</script>

<span
	class="sp-badge sp-badge--{color}"
	class:sp-badge--flat={flat}>
	{#if children}
		{@render children()}
	{/if}
</span>
