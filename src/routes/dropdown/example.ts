import type { DropdownProps } from '$lib';

export default (data: DropdownProps) => {
	return `
<script lang="ts">

	import {type DropdownOption, Dropdown} from '@surveyplanet/svelte_components';

	options: DropdownOption[] = ${JSON.stringify(data.options, null, 4)};

	const onDropdownChange = (e) => {
		console.log('change', e);
	}
</script>

<Dropdown
	{options}
	searchThreshold={${data.searchThreshold}}
	disabled={${data.disabled}}
	required={${data.required}}
	value={${data.value}}
	placeholder='${data.placeholder}'
	label='${data.label}'
	size='${data.size}'
	{onDropdownChange}
/>
`;
};
