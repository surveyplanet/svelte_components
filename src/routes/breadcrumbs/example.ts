import { type BreadcrumbData } from '$lib';

export default (data: BreadcrumbData[]) => {
	return `
<script lang="ts">
	import { type BreadcrumbData, Breadcrumbs } from '@surveyplanet/svelte_components';

	let data: BreadcrumbData[] = ${JSON.stringify(data, null, 4)};
</script>

<Breadcrumbs {data} />
`;
};
