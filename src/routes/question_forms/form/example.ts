import type { FormProps } from '$lib';

export default (
data: FormProps
) => {
	return `
<script lang="ts">
	import {Form, type FormProps} from '@surveyplanet/svelte-components';
	import type {FormValue} from '@surveyplanet/types';

	const onFormResponse = (response: FormValue[]) => {
		console.log(response);
	}

	let labels : FormProps['labels'] = ${JSON.stringify(data.labels)};
	let response: FormValue[] = ${JSON.stringify(data.response, null, 2)};
</script>
	
	
<Form
	id='${data.id}'
	{labels}
	random={${data.random}}
	{response}
	{onFormResponse}
/>`;
};
