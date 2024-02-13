import type { FormProps } from '$lib';

export default (
data: FormProps
) => {
	return `
<script lang ='ts'>
	import {Form} from '@surveyplanet/svelte-components';
	import type {FormValue} from '@surveyplanet/types';
	
	const responseHandler = (response: FormValue[]) => {
		console.log(response);
	}
</script>
	
	
<Form
	id='${data.id}'
	labels={${JSON.stringify(data.labels)}}
	random={${data.random}}
	response={${JSON.stringify(data.response)}}
/>`;
};
