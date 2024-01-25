<script
	context="module"
	lang="ts">
	import { COLORS } from './_definitions';

	export type LogoSize =
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

	export type LogoFillColor =
		| 'blue'
		| 'yellow'
		| 'pink'
		| 'green'
		| 'transparent';

	export type LogoColor = typeof COLORS.black | typeof COLORS.white;
</script>

<script lang="ts">
	const DEFAULT_SIZE: LogoSize = 24;

	let {
		color = COLORS.black,
		fill = 'blue',
		size = DEFAULT_SIZE,
	} = $props<{
		color?: LogoColor;
		fill?: LogoFillColor;
		size?: LogoSize;
	}>();

	let gradient: string[] = $state([
		COLORS.blueGradientStart,
		COLORS.blueGradientEnd,
	]);

	$effect(() => {
		if (fill !== 'transparent') {
			const startColor = COLORS[`${fill}GradientStart`];
			const endColor = COLORS[`${fill}GradientEnd`];
			gradient = [startColor, endColor];
		}
	});
</script>

<svg
	width={size}
	height={size}
	class="sp-logo"
	viewBox="0 0 {DEFAULT_SIZE} {DEFAULT_SIZE}"
	fill="none"
	xmlns="http://www.w3.org/2000/svg">
	<defs>
		<linearGradient
			id="fill_gradient"
			x1="12"
			y1="3"
			x2="12"
			y2="21"
			gradientUnits="userSpaceOnUse">
			<stop stop-color={gradient[0]} />
			<stop
				offset="1"
				stop-color={gradient[1]} />
		</linearGradient>
	</defs>

	{#if fill !== 'transparent'}
		<circle
			class="sp-logo--fill"
			cx="12"
			cy="12"
			r="9"
			fill="url(#fill_gradient)" />
	{/if}

	<path
		class="sp-logo--path"
		fill-rule="evenodd"
		clip-rule="evenodd"
		d="M19.7071 0.292893C20.0976 0.683418 20.0976 1.31658 19.7071 1.70711L17.6596 3.75457C20.2811 5.55739 22 8.57796 22 12C22 17.5228 17.5228 22 12 22C10.6443 22 9.35166 21.7302 8.17276 21.2415L5.70711 23.7071C5.31658 24.0976 4.68342 24.0976 4.29289 23.7071C3.90237 23.3166 3.90237 22.6834 4.29289 22.2929L6.34036 20.2454C3.71888 18.4426 2 15.422 2 12C2 6.47715 6.47715 2 12 2C13.3557 2 14.6483 2.26976 15.8272 2.75854L18.2929 0.292893C18.6834 -0.0976311 19.3166 -0.0976311 19.7071 0.292893ZM9.73838 19.6758L14.7071 14.7071C15.0976 14.3166 15.0976 13.6834 14.7071 13.2929C14.3166 12.9024 13.6834 12.9024 13.2929 13.2929L7.78497 18.8008C5.51285 17.3896 4 14.8715 4 12C4 7.58172 7.58172 4 12 4C12.7855 4 13.5445 4.1132 14.2616 4.32416L9.29289 9.29289C8.90237 9.68342 8.90237 10.3166 9.29289 10.7071C9.68342 11.0976 10.3166 11.0976 10.7071 10.7071L16.215 5.19919C18.4872 6.6104 20 9.12853 20 12C20 16.4183 16.4183 20 12 20C11.2145 20 10.4555 19.8868 9.73838 19.6758Z"
		fill={color} />
</svg>
