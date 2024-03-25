import type { LoaderProps } from '$lib';

export default (data: LoaderProps) => {
	return `
<script lang="ts">
	import { Loader, type LoaderProps } from '@surveyplanet/svelte_components';
	let colors : LoaderProps['colors'] = ${JSON.stringify(data.colors)};
</script>

<Loader 
	{colors}
	size={${data.size}}
	strokeWidth={${data.strokeWidth}} />
`;
};
