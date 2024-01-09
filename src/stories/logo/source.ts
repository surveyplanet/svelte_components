import type { LogoSize } from '$lib';

export default (size: LogoSize, fill: string, color: string) => {
	return `<script lang="ts">
	import { Logo, type LogoSize } from '@surveyplanet/svelte_components';

	const size = ${size};
	const fill = ${fill};
	const color = ${color};
</script>

<Logo {size} {fill} {color} />`;
};
