import type { RadioProps } from "$lib";

export default (
	data: RadioProps 
) => {
	return `
<script lang="ts">
	import Radio from '@surveyplanet/svelte_components';
	let onRadioChange = (event) => {
		console.log(event.detail);
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
