<script
	context="module"
	lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import ICON_DATA from './_icon_data';
	export type IconName = keyof typeof ICON_DATA & string;
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

	interface SVGPathAttr extends HTMLAttributes<SVGPathElement> {
		fill?: string;
		'stroke-width'?: number;
		'stroke-linecap'?: 'inherit' | 'round' | 'butt' | 'square' | null;
		'stroke-linejoin'?:
			| 'inherit'
			| 'round'
			| 'arcs'
			| 'miter-clip'
			| 'miter'
			| 'bevel'
			| null;

		stroke?: string;
	}
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
	let fillType = $derived(
		pathData.some((data) => 'fill' in data) ? 'fill' : 'none'
	);

	function parsePathAttr(data: (typeof pathData)[number]): SVGPathAttr {
		return 'fill' in data && data.fill
			? { fill: color }
			: {
					'stroke-width': strokeWidth,
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round',
					stroke: color,
				};
	}
</script>

<!-- fill:none is an issue if we want to fill -->
<svg
	{...attr}
	xmlns="http://www.w3.org/2000/svg"
	class="sp-icon sp-icon--{dasherize(name)}"
	width={size}
	height={size}
	viewBox="0 0 {DEFAULT_SIZE} {DEFAULT_SIZE}"
	fill={fillType}
	data-color={color}
	style={debug ? 'background-color: red;' : ''}>
	{#each pathData as data}
		<path
			d={data.d}
			{...parsePathAttr(data)} />
		<!-- 
		Could potentially build out more complex svg shapes with svelte:element
		<svelte:element this={data.type} {...data} />
		-->
	{/each}
</svg>
