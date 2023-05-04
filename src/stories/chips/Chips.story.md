# Chip Component Documentation

This component is a custom Svelte component for creating a set of chips/buttons. Each chip has an ID, label, title, and a selected state that can be toggled. When a chip is clicked, the selected state changes and the component dispatches a `click` event with the chip's ID as the detail. The `multiple` property is a boolean that determines whether multiple chips can be selected at once.

## Interfaces

| Name     | Type    | Description                                                                 |
| -------- | ------- | --------------------------------------------------------------------------- |
| ChipData | Object  | An object containing the properties `id`, `label`, `selected`, and `title`. |
| id       | string  | A unique identifier for the chip.                                           |
| label    | string  | An optional label to display on the chip.                                   |
| selected | boolean | A boolean that determines whether the chip is selected.                     |
| title    | string  | The title attribute for the chip.                                           |

## Exported Variables

| Name             | Type     | Description                                                                                                                     |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| data             | Array    | An array of `ChipData` objects that represent the chips.                                                                        |
| multiple         | Boolean  | A boolean that determines whether multiple chips can be selected at once.                                                       |
| chipClickHandler | Function | A function that handles the click event on a chip. It toggles the selected state and dispatches a click event with the chip ID. |
| toggleSelected   | Function | A function that toggles the selected state of a chip based on its ID.                                                           |

## Example Usage

```html
<script>
	import Chip from './Chip.svelte';

	const data = [
		{
			id: 'chip1',
			label: 'Chip 1',
			selected: true,
			title: 'Select Chip 1',
		},
		{
			id: 'chip2',
			label: 'Chip 2',
			selected: false,
			title: 'Select Chip 2',
		},
		{
			id: 'chip3',
			label: 'Chip 3',
			selected: false,
			title: 'Select Chip 3',
		},
	];

	function handleChipClick(event) {
		console.log('Clicked chip:', event.detail);
	}
</script>

<Chip
	data="{data}"
	multiple="{false}"
	on:click="{handleChipClick}" />
```

In this example, the `Chip` component is imported and used with an array of `ChipData` objects as the `data` property. The `multiple` property is set to `false` to allow only one chip to be selected at a time. The `on:click` event is used to handle the click event and log the selected chip's ID.
