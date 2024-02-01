# Scale Component

The `Scale` component allows users to provide a numerical response within a specified range.

### Properties

#### `ScaleProps`

| Property        | Type                               | Description                                            |
| --------------- | ---------------------------------- | ------------------------------------------------------ |
| `id`            | `string`                           | The unique identifier for the component.               |
| `min`           | `ScaleProperties['min']`           | The minimum value of the scale.                        |
| `max`           | `ScaleProperties['max']`           | The maximum value of the scale.                        |
| `response`      | `ScaleValue[]`                     | Array containing the selected scale values.            |
| `scaleResponse` | `(response: ScaleValue[]) => void` | Callback triggered when the scale response is changed. |

### Usage

```html
<script lang="ts">
	import { ScaleProps } from './path-to-scale-component';

	// Example usage
	let scaleProps: ScaleProps = {
		id: 'scale-question-1',
		min: 1,
		max: 10,
		response: [],
		scaleResponse: (response) => console.log('Scale Response:', response),
	};
</script>

<Scale {...scaleProps} />
```
