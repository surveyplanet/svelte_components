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

### Callbacks

| Name        | Description                                   | Type                 |
| ----------- | --------------------------------------------- | -------------------- |
| `onInput`   | Callback function triggered on input change.  | `(e: Event) => void` |
| `onBlur`    | Callback function triggered on input blur.    | `(e: Event) => void` |
| `onChange`  | Callback function triggered on input change.  | `(e: Event) => void` |
| `onFocus`   | Callback function triggered on input focus.   | `(e: Event) => void` |
| `onKeydown` | Callback function triggered on keydown event. | `(e: Event) => void` |
| `onKeyup`   | Callback function triggered on keyup event.   | `(e: Event) => void` |
