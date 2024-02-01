# Radio Component

The `Radio` component allows users to make a single selection from a list of options.

### Properties

#### `RadioProps`

| Property       | Type                             | Default                                             | Description                                             |
| -------------- | -------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| `id`           | `string`                         | Auto-generated unique identifier based on timestamp | The unique identifier for the radio input.              |
| `name`         | `string`                         | -                                                   | The name of the radio group to which the radio belongs. |
| `value`        | `string`                         | `null`                                              | The value associated with the radio input.              |
| `label`        | `string`                         | `''`                                                | The label displayed next to the radio input.            |
| `checked`      | `boolean`                        | `false`                                             | Flag indicating whether the radio input is checked.     |
| `disabled`     | `boolean`                        | `false`                                             | Flag indicating whether the radio input is disabled.    |
| `prependLabel` | `boolean`                        | `false`                                             | Flag to prepend the label to the radio input.           |
| `size`         | `'small' \| 'medium' \| 'large'` | `'small'`                                           | Size of the radio input.                                |
| `onchange`     | `(e: Event) => void`             | -                                                   | Event handler for the change event of the radio input.  |

### Usage

```html
<script lang="ts">
	import { RadioProps } from './path-to-radio-component';

	// Example usage
	let radioProps: RadioProps = {
		name: 'radioGroup',
		label: 'Option 1',
		checked: true,
		disabled: false,
		onchange: (e) => console.log('Radio changed:', e),
	};
</script>

<Radio {...radioProps} />
```
