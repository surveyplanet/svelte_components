<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children } = $props<{
		children?: Snippet;
	}>();
</script>

<div class="props-container">
	{#if children}
		{@render children()}
	{/if}
</div>

<style>
</style>
