# ProgressBar component

### Properties

#### `ProgressBarProps`

| Property       | Type      | Description                                              |
| -------------- | --------- | -------------------------------------------------------- |
| `max`          | `number`  | Maximum value for the progress bar.                      |
| `value`        | `number`  | Current value for the progress bar.                      |
| `speed`        | `number`  | Duration (in milliseconds) of the transition animation.  |
| `displayValue` | `boolean` | Flag to determine whether to display the progress value. |

### Usage

```html
<script lang="ts">
	import { ProgressBarProps } from './path-to-progressbar-component';

	// Example usage
	let progressBarProps: ProgressBarProps = {
		max: 100,
		value: 50,
		speed: 1000,
		displayValue: true,
	};
</script>

<ProgressBar {...progressBarProps} />
```
