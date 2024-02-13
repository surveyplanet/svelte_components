import type { LogoProps } from '$lib';

export default (
data: LogoProps
) => {
	return `
<script lang="ts">

	import { Logo, type LogoSize } from '@surveyplanet/svelte_components';

</script>

<Logo 
	size={${data.size}}
	fill='${data.fill}'
	color='${data.color}'
	symbolOnly={${data.symbolOnly}} />`;
};
