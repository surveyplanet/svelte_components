# Spinner Component

This module exports a Svelte component that provides an input field for entering numeric response with increment and decrement buttons.

## Exported Variables

| Name        | Type                | Description                                                                                                                             |
| ----------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| label       | string              | The label of the input                                                                                                                  |
| id          | string              | The unique id of the input                                                                                                              |
| step        | number              | The step of the input                                                                                                                   |
| min         | number              | The minimum value of the input                                                                                                          |
| max         | number              | The maximum value of the input                                                                                                          |
| value       | number or undefined | The value of the input                                                                                                                  |
| disabled    | boolean             | Whether the input is disabled                                                                                                           |
| required    | boolean             | Whether the input is required                                                                                                           |
| overflow    | boolean             | Whether the value will change to the min or max value when the user tries to increment or decrement the value over the min or max value |
| placeholder | string              | The placeholder of the input                                                                                                            |
| dragSpeed   | number              | The speed of the drag on the input                                                                                                      |

## Events

| Event  | Description                                                                                        |
| ------ | -------------------------------------------------------------------------------------------------- |
| change | Triggered when the change from input happens. The event detail contains the `value` of the input.  |
| blur   | Triggered when the input is blurred. The event detail contains the `value` of the input.           |
| focus  | Triggered when the input is focused. The event detail contains the `value` of the input.           |
| update | Triggered when the value of the input changes. The event detail contains the `value` of the input. |

## Example Usage

```html
<script>
	import Spinner from './Spinner.svelte';

	let value = 50;
	let disabled = false;
</script>

<Spinner
	label="Enter a number:"
	min="0"
	max="100"
	step="1"
	value="{value}"
	disabled="{disabled}"
	required
	overflow />
```

## Implementation Details

This module exports a Svelte component that provides an input field for entering numeric response with increment and decrement buttons. The component uses the Cleave.js library to format the input value as a number. It also provides event dispatchers for change and blur/focus events.

This component can be used for time inputs. To do so, set the step to 60 and the min to 0. Then, the value will be in minutes and the input will be formatted as a time. Use 2 separate time inputs to enter hours and minutes. You can use 12 as max for the first input if 12h time format is desired.