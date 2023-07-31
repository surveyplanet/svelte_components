import type { ChipData } from '$lib';

export default (
	data: ChipData[],
	selectable: boolean,
	multiSelect: boolean,
	removable: boolean
) => {
	return `<script lang="ts">
	import { Chips, type ChipData } from '@surveyplanet/svelte_components';

	const data = ${JSON.stringify(data)};
	const selectable = ${selectable};
	const multiSelect = ${multiSelect};
	const removable = ${removable};


	const chipClickHandler = (event:CustomEvent) {
		console.log('Clicked chip:', event.detail);
	}
</script>

<Chip
	{data}
	{selectable}
	{multiSelect}
	{removable}
	on:click={chipClickHandler} />`;
};
