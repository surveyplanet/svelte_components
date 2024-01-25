<script
	context="module"
	lang="ts">
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
</script>

<script lang="ts">
	import { COLORS } from './';
	import { dasherize } from '@surveyplanet/utilities';

	const DEFAULT_SIZE: IconSize = 24;

	let {
		color = COLORS.black,
		size = DEFAULT_SIZE,
		strokeWidth = 2,
		name,
		debug = false,
	} = $props<{
		color?: string;
		size?: IconSize;
		strokeWidth?: number;
		name: IconName;
		debug?: boolean;
	}>();

	let pathData = $derived(ICON_DATA[name]);
</script>

<svg
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
