# TextInput Component

The `TextInput` component is used to create various types of text input fields, including single-line text, password, search, date, time, datetime-local, and multiline (textarea).

### Properties

#### `TextInputType`

The `TextInputType` is a union type representing different types of text inputs:

-   `'password'`
-   `'search'`
-   `'text'`
-   `'date'`
-   `'time'`
-   `'datetime-local'`
-   `'multiline'`

#### `TextInputProps`

| Property                | Type                             | Description                                       |
| ----------------------- | -------------------------------- | ------------------------------------------------- |
| `id`                    | `string`                         | The unique identifier for the text input.         |
| `name`                  | `string`                         | The name attribute of the text input.             |
| `type`                  | `TextInputType`                  | The type of the text input.                       |
| `value`                 | `string`                         | The current value of the text input.              |
| `label`                 | `string`                         | The label or title for the text input.            |
| `placeholder`           | `string \| null`                 | The placeholder text for the input.               |
| `readonly`              | `boolean`                        | If `true`, the text input is read-only.           |
| `disabled`              | `boolean`                        | If `true`, the text input is disabled.            |
| `cleaveOptions`         | `CleaveOptions`                  | Cleave.js options for formatting the input value. |
| `validationRules`       | `string[]`                       | Array of validation rules for the input.          |
| `validationMessage`     | `string \| null`                 | Custom validation error message.                  |
| `size`                  | `'small' \| 'medium' \| 'large'` | The size of the text input.                       |
| `validationHideMessage` | `boolean \| null`                | If `true`, hides the validation error message.    |
| `oninput`               | `(e: Event) => void`             | Callback triggered on input change.               |
| `onblur`                | `(e: Event) => void`             | Callback triggered on input blur.                 |
| `onchange`              | `(e: Event) => void`             | Callback triggered on input change.               |
| `onfocus`               | `(e: Event) => void`             | Callback triggered on input focus.                |
| `onkeydown`             | `(e: Event) => void`             | Callback triggered on keydown event.              |
| `onkeyup`               | `(e: Event) => void`             | Callback triggered on keyup event.                |

### Usage

```html
<script lang="ts">
	import { TextInputProps } from './path-to-textinput-component';

	// Example usage
	let textInputProps: TextInputProps = {
		id: 'myInput',
		name: 'myInputName',
		type: 'text',
		value: '',
		label: 'Enter your text',
		placeholder: 'Type here...',
		readonly: false,
		disabled: false,
		cleaveOptions: {
			/* Cleave.js options */
		},
		validationRules: ['require', 'minLength:3'],
		validationMessage: 'Please enter at least 3 characters.',
		size: 'medium',
		validationHideMessage: false,
		oninput: (e) => console.log('Input changed:', e),
		onblur: (e) => console.log('Input blurred:', e),
		onchange: (e) => console.log('Input changed:', e),
		onfocus: (e) => console.log('Input focused:', e),
		onkeydown: (e) => console.log('Keydown event:', e),
		onkeyup: (e) => console.log('Keyup event:', e),
	};
</script>

<TextInput {...textInputProps} />
```
