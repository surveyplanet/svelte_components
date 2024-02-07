import type { EssayProperties, EssayValue } from '@surveyplanet/types';

export default (
	id: string,
	min: EssayProperties['min'],
	max: EssayProperties['max'],
	single: EssayProperties['single'],
	response: EssayValue[]
) => {
	return `
<script lang ='ts'>
	import {Scoring} from '@surveyplanet/svelte-components';
	import type {ScoringValue} from '@surveyplanet/types';

	const responseHandler = (response: ScoringValue[]) => {
		console.log(response);
	}
</script>	


<Essay
	id = '${id}'
	min = {${min}}
	max = {${max}}
	single = {${single}}
	response = {${JSON.stringify(response)}}
/>`;
};
