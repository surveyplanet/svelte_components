<script lang="ts">
	import type { Snippet } from 'svelte';

	let { color, flat, children } = $props<{
		color: 'yellow' | 'blue' | 'pink' | 'green';
		flat: boolean;
		children?: Snippet;
	}>();
</script>

<span
	class="sp-badge sp-badge--{color}"
	class:sp-badge--flat={flat}>
	{#if children}
		{@render children()}
	{/if}
</span>
