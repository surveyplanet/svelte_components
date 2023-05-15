<script
	context="module"
>import ICON_DATA from "./_icon_data";
</script>

<script>import { COLORS } from "./";
import { dasherize } from "@surveyplanet/utilities";
const DEFAULT_SIZE = 24;
export let color = COLORS.slateDark;
export let size = DEFAULT_SIZE;
export let strokeWidth = 2;
export let name;
export let debug = false;
$:
  pathData = ICON_DATA[name];
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
