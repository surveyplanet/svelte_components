### Example

```html
<script>
	import { Spinner } from '@surveyplanet/svelte_components';
	const changeEventHandler = (event) => {
		console.log(`You really like ${event.value}`);
	};
</script>

<Spinner
	value="{5)"
	label="Number spinner"
	on:change="{changeEventHandler}" />
```

### Properties

| Property         | Type    | Description                                                                    |
| ---------------- | ------- | ------------------------------------------------------------------------------ |
| `value=null`     | String  | The initial value of the input.                                                |
| `label=null`     | String  | The input label text. If no label text is give not label tag will be rendered. |
| `disabled=false` | Boolean | Whether the input is disabled or not.                                          |
| `readonly=false` | Boolean | Whether the input is read only or not.                                         |
| `required`       | String  | Whether a value is required or not.                                            |
| `min`            | Number  | Minimum value                                                                  |
| `max`            | Number  | Max value                                                                      |
| `step=1`         | Number  | The value to increment by                                                      |
| `overflow=false` | Boolean | If value goes above max value will overflow to min and vice versa              |
| `time=false`     | Boolean | Time based spinner                                                             |
| `currency=false` | Boolean | Currency based spinner                                                         |

### Events

| Name     | Returns     | Description                                  |
| -------- | ----------- | -------------------------------------------- |
| `focus`  | CustomEvent | Dispatched when the input is in focus.       |
| `blur`   | CustomEvent | Dispatched when the input loses focus.       |
| `change` | CustomEvent | Dispatched when the input value has changed. |
