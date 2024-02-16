import type { CheckboxProps } from "$lib";

export default (
 data: CheckboxProps
) => {
	return `
<script lang="ts">
	import {Checkbox, ComponentEvent} from '@surveyplanet/svelte_components';
	const onCheckboxChange = (event: ComponentEvent<boolean>): void => {
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
