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

	const chipClickHandler = (event:CustomEvent) {
		console.log('Clicked chip:', event.detail);
	}

	const chipRemoveHandler = (event:CustomEvent) {
		console.log('Removed chip:', event.detail);
	}
</script>

<Chip
	data = {${JSON.stringify(data, null, 2)}}
	selectable = ${selectable}
	multiSelect = ${multiSelect}
	removable = ${removable}
	onClick={chipClickHandler}
	onRemove={chipRemoveHandler}
	/>`;
};
