import type { ToggleProps } from '$lib';

export default (data: ToggleProps) => {
	return `
<script lang="ts">
	import { Toggle, type ToggleProps } from '@surveyplanet/svelte-components';
	function onToggleChange(event: ComponentEvent<boolean>) {
		console.log(event.value);
	}
</script>

<Toggle
	id="${data.id ? data.id : ''}"
	on={${data.on}}
	label="${data.label}"
	disabled={${data.disabled}}
	tall={${data.tall}}
	size="${data.size ? data.size : ''}"
	prependLabel={${data.prependLabel}}
	{onToggleChange}
	/>
`;
};
