# Range Component

The `Range` component allows users to select a range of values using a slider.

### Properties

#### `RangeProps`

| Property        | Type                            | Description                                            |
| --------------- | ------------------------------- | ------------------------------------------------------ |
| `id`            | `string`                        | The unique identifier for the component.               |
| `min`           | `number`                        | The minimum value of the range.                        |
| `max`           | `number`                        | The maximum value of the range.                        |
| `response`      | `RangeValue[]`                  | Array containing the selected range values.            |
| `rangeResponse` | `(value: RangeValue[]) => void` | Callback triggered when the range response is changed. |

### Usage

```html
<script lang="ts">
	import { RangeProps } from './path-to-range-component';

	// Example usage
	let rangeProps: RangeProps = {
		id: 'range-question-1',
		min: 0,
		max: 100,
		response: [],
		rangeResponse: (response) => console.log('Range Response:', response),
	};
</script>

<Range {...rangeProps} />
```
