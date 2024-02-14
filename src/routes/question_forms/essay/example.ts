import type { EssayProps } from '$lib';

export default (
	data: EssayProps
) => {
	return `
<script lang="ts">
	import {Essay} from '@surveyplanet/svelte-components';
	import type {EssayValue} from '@surveyplanet/types';

	const onEssayResponse = (response: EssayValue[]) => {
		console.log(response);
	};

	let response: EssayValue[] = ${JSON.stringify(data.response, null, 2)};

</script>	


<Essay
	id='${data.id}'
	min={${data.min}}
	max={${data.max}}
	single={${data.single}}
	{response}
	{onEssayResponse}
/>`;
};
