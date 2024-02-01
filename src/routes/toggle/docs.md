# Toggle Component

The `Toggle` component represents a simple on/off switch. It provides a visual indicator and allows users to toggle between two states.

### Properties

#### `ToggleProps`

| Property       | Type                    | Description                                                 |
| -------------- | ----------------------- | ----------------------------------------------------------- |
| `id`           | `string`                | The unique identifier for the toggle.                       |
| `name`         | `string`                | The name attribute of the toggle.                           |
| `disabled`     | `boolean`               | If `true`, the toggle is disabled.                          |
| `on`           | `boolean`               | The current state of the toggle (on/off).                   |
| `tall`         | `boolean`               | If `true`, the toggle is tall, providing a larger hit area. |
| `label`        | `string \| null`        | The label or text associated with the toggle.               |
| `prependLabel` | `boolean`               | If `true`, the label is prepended to the toggle.            |
| `onchange`     | `(on: boolean) => void` | Callback triggered when the toggle state changes.           |

### Usage

```html
<script lang="ts">
	import { ToggleProps } from './path-to-toggle-component';

	// Example usage
	let toggleProps: ToggleProps = {
		id: 'myToggle',
		name: 'myToggleName',
		disabled: false,
		on: false,
		tall: false,
		label: 'Enable Feature',
		prependLabel: false,
		onchange: (on) => console.log('Toggle state changed:', on),
	};
</script>

<Toggle {...toggleProps} />
```
