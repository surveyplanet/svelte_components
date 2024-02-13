import type {  ChipsProps } from '$lib';

export default (
	data: ChipsProps ,
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

	let data: ChipsProps = ${JSON.stringify(data, null, 4)};
</script>

<Chip
	data={data}
	selectable={${data.selectable}}
	multiSelect={${data.multiSelect}}
	removable={${data.removable}}
	{onChipsClick}
	{onChipsRemove}
	/>`;
};
