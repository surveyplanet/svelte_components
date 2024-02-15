import type { CheckboxProps } from "$lib";

export default (
 data: CheckboxProps
) => {
	return `
<script lang="ts">
	import {Checkbox} from '@surveyplanet/svelte_components';
	const onCheckboxChange = (event: Event): void => {
		console.log(event)
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
