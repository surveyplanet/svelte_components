import type { ToggleProps } from "$lib";

export default (
	data: ToggleProps
) => {
	return `
<script="ts">
	import { Toggle } from '@surveyplanet/svelte-components';

	function onToggleChange(on) {
		if (on) {
			console.log('Toggle ON 🎉');
		} else {
			console.log('Toggle OFF 😤');
		}
	}
</script>

<Toggle	
	id='${data.id}'
	on={${data.on}}
	disabled={${data.disabled}}
	tall={${data.tall}}
	name='${data.name}'
	label='${data.label}'
	prependLabel={${data.prependLabel}}
	{onToggleChange}
	/>
`;
};
