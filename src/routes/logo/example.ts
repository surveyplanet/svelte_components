import type { LogoSize } from '$lib';

export default (
	size: LogoSize,
	fill: string,
	color: string,
	symbolOnly: boolean
) => {
	return `
<script lang="ts">

	import { Logo, type LogoSize } from '@surveyplanet/svelte_components';

</script>

<Logo 
	size={${size}}
	fill='${fill}'
	color='${color}'
	symbolOnly={${symbolOnly}} />`;
};
