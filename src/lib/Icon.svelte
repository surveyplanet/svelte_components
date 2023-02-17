<script lang="ts">
	import { onMount } from 'svelte';
	import { COLORS } from './';
	import ICON_DATA from './_icon_data';
	const DEFAULT_SIZE = 24;

	/**
	 * The icon color. default: '#262b35'
	 */
	export let color = COLORS.slate_dark;

	/**
	 * The icon width and height in pixes. default: 48
	 */
	export let size: 8 | 16 | 20 | 24 | 32 | 48 | 64 | 128 | 256 | 512 =
		DEFAULT_SIZE;

	/**
	 * The name of the icon used to display the vector path
	 */
	export let name = Object.keys(ICON_DATA)[0];

	/**
	 * Display a red background behind the icon for debugging
	 */
	export let debug = false;

	onMount(() => {
		if (!(name in ICON_DATA)) {
			console.error(`Icon not found: ${name}`);
			name = 'notFound';
			color = 'red';
			size = DEFAULT_SIZE;
		}
	});
</script>

<!--
@component
This is an icon component.

**Usage:**
```tsx
<Icon name="close" color="white" size={32}>
```
-->
{#if name && name in ICON_DATA}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="sp-icon sp-icon--{name}"
		width={size}
		height={size}
		viewBox="0 0 {DEFAULT_SIZE} {DEFAULT_SIZE}"
		fill="none"
		style={debug ? 'background-color: red;' : ''}>
		<title>{'icon ' + name}</title>
		{#each ICON_DATA[name] as data}
			{#if data.type}
				<svelte:element
					this={data.type}
					{...data}
					fill={'fill' in data ? color : null}
					stroke={'stroke' in data ? color : null} />
			{:else}
				<path
					{...data}
					fill={'fill' in data ? color : null}
					stroke={color} />
			{/if}
		{/each}
	</svg>
{/if}
