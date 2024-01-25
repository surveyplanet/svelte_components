<script lang="ts">
	import '../main.scss'; // app styles
	import '../styles/main.scss'; // component styles
	import type { Snippet } from 'svelte';
	import type { PageData } from './$types';

	import { createComponentsStore } from '../components/stores/components.store.svelte';

	let { data, children } = $props<{
		data: PageData;
		children?: Snippet;
	}>();
	createComponentsStore.componentsStore = data.componentsList;
</script>

{#if children}
	{@render children()}
{/if}
