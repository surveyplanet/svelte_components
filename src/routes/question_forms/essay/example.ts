import type { EssayProps } from '$lib';

export default (data: EssayProps) => {
	return `
<script lang="ts">
	import {Essay, ComponentEvent} from '@surveyplanet/svelte-components';
	import type {EssayValue} from '@surveyplanet/types';

	const onEssayResponse = (event: ComponentEvent<EssayValue[]>) => {
		console.log(event.value);
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
