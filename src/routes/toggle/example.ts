import type { ToggleProps } from "$lib";

export default (
	data: ToggleProps
) => {
	return `
<script lang="ts">
	import { Toggle, type ToggleProps } from '@surveyplanet/svelte-components';
	function onToggleChange(on: ToggleProps['on']) {
		console.log(on);
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
