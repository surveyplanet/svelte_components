import type { ColorSelectorProps } from '$lib';

export default (data: ColorSelectorProps) => {
	return `
<script lang="ts">
	import { ColorSelector, type ColorSelectorProps  } from '@surveyplanet/svelte_components';

	const onColorSelectorChange = (event: ComponentEvent<string, HTMLInputElement>): void => {
		console.log(event.value);
	};
	const onColorSelectorInput = (event: ComponentEvent<string, HTMLInputElement>): void => {
		console.log(event.value);
	};

	let value: ChipDaColorSelectorProps['value] = ${JSON.stringify(data.value, null, 4)};
</script>

<ColorSelector
	bind:value={data}
	{onColorSelectorChange}
	{onColorSelectorInput} />`;
};
