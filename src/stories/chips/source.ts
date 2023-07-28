export default:`<script lang="ts">
	import { Chips, type ChipData } from '@surveyplanet/svelte_components';

	const data = [
		{
			id: 'chip1',
			label: 'Chip 1',
			selected: true,
		},
		{
			id: 'chip2',
			label: 'Chip 2',
			selected: false,
		},
		{
			id: 'chip3',
			label: 'Chip 3',
			selected: false,
		},
	] as ChipData;

	const chipClickHandler = (event:CustomEvent) {
		console.log('Clicked chip:', event.detail);
	}
</script>

<Chip
	{data}
	selectable={true}
	multiSelect={false}
	closeable={false}
	on:click={chipClickHandler} />`