import type { EssayProps } from '$lib';

export default (
	data: EssayProps
) => {
	return `
<script lang ="ts">
	import {Scoring} from '@surveyplanet/svelte-components';
	import type {ScoringValue} from '@surveyplanet/types';

	const responseHandler = (response: ScoringValue[]) => {
		console.log(response);
	}
</script>	


<Essay
	id='${data.id}'
	min={${data.min}}
	max={${data.max}}
	single={${data.single}}
	response={${JSON.stringify(data.response)}}
/>`;
};
