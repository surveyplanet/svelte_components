<script lang="ts">
	import '../main.scss'; // app styles
	import '../styles/main.scss'; // component styles
	import type { DropdownOptions } from '$lib/Dropdown.svelte';
	import { componentsStore } from '../components/components.store';

	export let data;
	let componentsData: DropdownOptions[] = data.componentsList;
	componentsStore.set(componentsData);
</script>

<slot />
