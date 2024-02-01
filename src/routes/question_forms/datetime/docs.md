# DateTime Component

The `DateTime` component is used to capture date and/or time responses in a survey question.

### Properties

#### `DateTimeProps`

| Property             | Type                                  | Description                                                   |
| -------------------- | ------------------------------------- | ------------------------------------------------------------- |
| `id`                 | `string`                              | The unique identifier for the component.                      |
| `date`               | `boolean`                             | Flag to include date input.                                   |
| `time`               | `boolean`                             | Flag to include time input.                                   |
| `response`           | `DateTimeValue[]`                     | Array of date-time values as ISO strings.                     |
| `onDatetimeResponse` | `(response: DateTimeValue[]) => void` | Callback triggered when the date-time input value is changed. |

### Usage

```html
<script lang="ts">
	import { DateTimeProps } from './path-to-datetime-component';

	// Example usage
	let dateTimeProps: DateTimeProps = {
		id: 'datetime-question-1',
		date: true,
		time: true,
		response: [],
		onDatetimeResponse: (response) =>
			console.log('Date-Time Response:', response),
	};
</script>

<DateTime {...dateTimeProps} />
```
