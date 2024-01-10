import { type BreadcrumbData } from '$lib';

export default (data: BreadcrumbData[]) => {
	return `<script>
import { Breadcrumbs } from '@surveyplanet/svelte_components';

const data = ${JSON.stringify(data, null, 2)};
</script>


<Breadcrumbs {data} />
`;
};
