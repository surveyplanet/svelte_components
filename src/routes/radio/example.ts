import type { RadioProps } from "$lib";

export default (
	data: RadioProps 
) => {
	return `
<script lang="ts">
	import {Radio, ComponentEvent} from '@surveyplanet/svelte_components';
	let onRadioChange = (event: ComponentEvent<boolean>) => {
		console.log(event);
	};
</script>

<Radio
	id='${data.id}'
	disabled={${data.disabled}}
	name='${data.name}'
	label='${data.label}'
	prependLabel={${data.prependLabel}}
	size='${data.size}'
	{onRadioChange} />
`;
};
