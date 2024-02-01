# Spinner Component

The `Spinner` component provides a numeric input with increment and decrement buttons for easy value manipulation.

### Properties

#### `SpinnerProps`

| Property      | Type            | Description                                                                |
| ------------- | --------------- | -------------------------------------------------------------------------- | -------------------------------------------- | -------------------- |
| `label`       | `string`        | The label or title for the spinner.                                        |
| `id`          | `string`        | The unique identifier for the spinner.                                     |
| `step`        | `number`        | The step value for incrementing or decrementing.                           |
| `min`         | `number`        | The minimum allowed value for the spinner.                                 |
| `max`         | `number`        | The maximum allowed value for the spinner.                                 |
| `value`       | `number         | undefined`                                                                 | The current value of the spinner.            |
| `disabled`    | `boolean`       | Indicates whether the spinner is disabled.                                 |
| `required`    | `boolean`       | Indicates whether the spinner is required.                                 |
| `overflow`    | `boolean`       | If `true`, allows the value to overflow beyond the `min` and `max` limits. |
| `dragSpeed`   | `number`        | The speed (in pixels) at which dragging the mouse should change the value. |
| `placeholder` | `string`        | Placeholder text for the spinner input.                                    |
| `size`        | `'small'        | 'medium'                                                                   | 'large'`                                     | Size of the spinner. |
| `onupdate`    | `(value: number | undefined) => void`                                                        | Callback function triggered on value update. |
| `oninput`     | `(value: number | undefined) => void`                                                        | Callback function triggered on input change. |
| `onchange`    | `(value: number | undefined) => void`                                                        | Callback function triggered on value change. |
| `onblur`      | `() => void`    | Callback function triggered on input blur.                                 |
| `onfocus`     | `() => void`    | Callback function triggered on input focus.                                |

### Usage

```html
<script lang="ts">
	import { SpinnerProps } from './path-to-spinner-component';

	// Example usage
	let spinnerProps: SpinnerProps = {
		label: 'Quantity',
		id: 'quantitySpinner',
		step: 1,
		min: 0,
		max: 100,
		value: 5,
		disabled: false,
		required: true,
		overflow: false,
		dragSpeed: 10,
		placeholder: 'Enter quantity',
		size: 'medium',
		onupdate: (value) => console.log('Updated Value:', value),
		oninput: (value) => console.log('Input Value:', value),
		onchange: (value) => console.log('Changed Value:', value),
		onblur: () => console.log('Input blurred'),
		onfocus: () => console.log('Input focused'),
	};
</script>

<Spinner {...spinnerProps} />
```
