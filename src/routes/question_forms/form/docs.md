# Form Component

The `Form` component allows users to input text responses for a set of predefined labels.

### Properties

#### `FormProps`

| Property         | Type                           | Description                                                       |
| ---------------- | ------------------------------ | ----------------------------------------------------------------- |
| `id`             | `string`                       | The unique identifier for the component.                          |
| `labels`         | `FormProperties['labels']`     | An array of labels for which text responses need to be collected. |
| `random`         | `FormProperties['random']`     | If set to `true`, the labels will be displayed in a random order. |
| `response`       | `FormValue[]`                  | Array of form values containing label-value pairs.                |
| `onFormResponse` | `(value: FormValue[]) => void` | Callback triggered when the form response is changed.             |

### Usage

```html
<script lang="ts">
	import { FormProps } from './path-to-form-component';

	// Example usage
	let formProps: FormProps = {
		id: 'form-question-1',
		labels: ['Label1', 'Label2', 'Label3'],
		random: true,
		response: [],
		onFormResponse: (response) => console.log('Form Response:', response),
	};
</script>

<form {...formProps} />
```
