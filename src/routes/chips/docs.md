# Chip Component Documentation

This component is a custom Svelte component for creating a set of chips/buttons. Each chip has an ID, label and selected state that can be toggled. When a chip is clicked, the selected state changes and the component dispatches a `click` event with the chip's ID as the detail. The `multiple` property is a boolean that determines whether multiple chips can be selected at once.

## Props

| Name          | Type       | Description                                                                        |
| ------------- | ---------- | ---------------------------------------------------------------------------------- |
| `data`        | ChipData[] | An array of `ChipData` objects that represent the chips.                           |
| `selectable`  | Boolean    | Whether the chips can be selected or not.                                          |
| `multiSelect` | Boolean    | Whether multiple chips can be selected at once. Only valid is selectable is `true` |
| `removable`   | Boolean    | Whether chips can be removable or not.                                             |

## Events

| Name     | Description                                                               |
| -------- | ------------------------------------------------------------------------- |
| `click`  | An array of `ChipData` objects that represent the chips.                  |
| `remove` | A boolean that determines whether multiple chips can be selected at once. |

## Example Usage

```svelte
<script lang="ts">
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

	const chipClickHandler = (event: CustomEvent) => {
		console.log('Clicked chip:', event.detail);
	};
</script>

<Chip
	{data}
	selectable={true}
	multiSelect={false}
	closeable={false}
	on:click={chipClickHandler} />
```

## Interfaces

### ChipData

| Name            | Type     | Description                                                                 |
| --------------- | -------- | --------------------------------------------------------------------------- |
| `data`          | ChipData | An object containing the properties `id`, `label`, `selected`, and `title`. |
| `data.id`       | string   | A unique identifier for the chip.                                           |
| `data.label`    | string   | An optional label to display on the chip.                                   |
| `data.selected` | boolean  | A boolean that determines whether the chip is selected.                     |
