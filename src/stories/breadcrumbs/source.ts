export default (
	breadcrumbs: {
		name: string;
		url: string;
	}[]
) => {
	return `<script>
import { Breadcrumbs } from '@surveyplanet/svelte_components';

const breadcrumbs = ${JSON.stringify(breadcrumbs)};
</script>


<Breadcrumbs {breadcrumbs} />
`;
};
