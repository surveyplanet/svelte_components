import type { ChipsProps } from '$lib';

export default (data: ChipsProps) => {
	return `
<script lang="ts">
	import { Chips, type ChipData } from '@surveyplanet/svelte_components';

	const onChipsClick = (event: ComponentEvent<ChipData[]>): void => {
		console.log(event.value);
	};
	const onChipsRemove = (event: ComponentEvent<ChipData[]>): void => {
		console.log(event.value);
	};

	let data: ChipData[] = ${JSON.stringify(data.data, null, 4)};
</script>

<Chips
	data={data}
	selectable={${data.selectable}}
	multiSelect={${data.multiSelect}}
	removable={${data.removable}}
	{onChipsClick}
	{onChipsRemove}
	/>`;
};
