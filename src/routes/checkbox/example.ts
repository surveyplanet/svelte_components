import type { CheckboxProps } from "$lib";

export default (
 data: CheckboxProps
) => {
	return `
<script>
	import {Checkbox} from '@surveyplanet/svelte_components';
	const onCheckboxChange = (e: Event): void => {
		console.log(e)
	};
	
</script>

<Checkbox
	id='${data.id}'
	name='${data.name}'
	value='${data.value}'
	checked={${data.checked}}
	disabled={${data.disabled}}
	prependLabel={${data.prependLabel}}
	size='${data.size}'
	{onCheckboxChange}/>
`;
};
