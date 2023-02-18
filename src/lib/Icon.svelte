<script lang="ts">
	import { COLORS } from './';
	import ICON_DATA from './_icon_data';

	const DEFAULT_SIZE = 24;

	type IconName = keyof typeof ICON_DATA;

	/**
	 * The icon color. default: '#262b35'
	 */
	export let color: string = COLORS.slate_dark;

	/**
	 * The icon width and height in pixes. default: 48
	 */
	export let size: 8 | 16 | 20 | 24 | 32 | 48 | 64 | 128 | 256 | 512 =
		DEFAULT_SIZE;

	/**
	 * The name of the icon used to display the vector path
	 */
	export let name: IconName;

	/**
	 * Display a red background behind the icon for debugging
	 */
	export let debug = false;
</script>

<!--
@component
This is an icon component.

**Usage:**
```tsx
<Icon name="close" color="white" size={32}>
```
-->
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
		<path
			{...data}
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke={color} />

		<!-- 
		Could potentially build out more complex svg shapes with svelte:element
		<svelte:element this={data.type} {...data} />
		-->
	{/each}
</svg>
