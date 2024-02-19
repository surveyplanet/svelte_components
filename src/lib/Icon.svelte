<script
	context="module"
	lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import ICON_DATA from './_icon_data';
	export type IconName = keyof typeof ICON_DATA;
	export type IconSize =
		| 8
		| 12
		| 16
		| 20
		| 24
		| 32
		| 48
		| 64
		| 128
		| 256
		| 512;

	export type IconProps = HTMLAttributes<SVGElement> & {
		name: IconName;
		color?: string;
		size?: IconSize;
		strokeWidth?: number;
		debug?: boolean;
	};
</script>

<script lang="ts">
	import { COLORS } from './';
	import { dasherize } from '@surveyplanet/utilities';

	const DEFAULT_SIZE: IconSize = 24;

	let {
		name,
		color = COLORS.black, // black is the most common color for icons
		size = DEFAULT_SIZE,
		strokeWidth = 2, // thickness seems to be fine at 2
		debug,
		...attr
	} = $props<IconProps>();

	let pathData = $derived(ICON_DATA[name]);
</script>

<svg
	{...attr}
	xmlns="http://www.w3.org/2000/svg"
	class="sp-icon sp-icon--{dasherize(name)}"
	width={size}
	height={size}
	viewBox="0 0 {DEFAULT_SIZE} {DEFAULT_SIZE}"
	fill="none"
	data-color={color}
	style={debug ? 'background-color: red;' : ''}>
	<!-- <title>{'icon ' + name}</title> -->
	{#each pathData as data}
		<path
			stroke-width={strokeWidth}
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke={color}
			{...data} />
		<!-- 
		Could potentially build out more complex svg shapes with svelte:element
		<svelte:element this={data.type} {...data} />
		-->
	{/each}
</svg>
