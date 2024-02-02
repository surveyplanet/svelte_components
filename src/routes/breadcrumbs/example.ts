import { type BreadcrumbData } from '$lib';

export default (data: BreadcrumbData[]) => {
	return `
	<script>

		import { Breadcrumbs } from '@surveyplanet/svelte_components';

	</script>

	<Breadcrumbs data= ${data} />
`;
};
