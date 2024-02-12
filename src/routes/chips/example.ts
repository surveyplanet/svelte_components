import type { ChipData } from '$lib';

export default (
	data: ChipData[],
	selectable: boolean,
	multiSelect: boolean,
	removable: boolean
) => {
	return `
<script lang="ts">
	import { Chips, type ChipData } from '@surveyplanet/svelte_components';

	const onChipsClick = (data: ChipData[]): void => {
		console.log(data);
	};
	const onChipsRemove = (data: ChipData[]): void => {
		console.log(data);
	};
</script>

<Chip
	data={${JSON.stringify(data, null, 2)}}
	selectable={${selectable}}
	multiSelect={${multiSelect}}
	removable={${removable}}
	{onChipsClick}
	{onChipsRemove}
	/>`;
};
