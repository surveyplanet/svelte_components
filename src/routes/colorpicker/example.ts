import type { ColorPickerProps } from '$lib';

export default (data: ColorPickerProps) => {
	return `
<script lang="ts">
	import { ColorPicker, type ColorPickerProps  } from '@surveyplanet/svelte_components';

	const onColorPickerChange = (event: ComponentEvent<string, HTMLInputElement>): void => {
		console.log(event.value);
	};
	const onColorPickerInput = (event: ComponentEvent<string, HTMLInputElement>): void => {
		console.log(event.value);
	};

	let value: ChipDaColorPickerProps['value] = ${JSON.stringify(data.value, null, 4)};
</script>

<ColorPicker
	bind:value={data}
	{onColorPickerChange}
	{onColorPickerInput} />`;
};
