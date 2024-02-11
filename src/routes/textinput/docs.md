### Properties

| Property                | Type                             | Description                                       | Default  |
| ----------------------- | -------------------------------- | ------------------------------------------------- | -------- |
| `id`                    | `string`                         | The unique identifier for the text input.         |          |
| `name`                  | `string`                         | The name attribute of the text input.             |          |
| `type`                  | `TextInputType`                  | The type of the text input.                       |          |
| `value`                 | `string`                         | The current value of the text input.              |          |
| `label`                 | `string`                         | The label or title for the text input.            |          |
| `placeholder`           | `string \| null`                 | The placeholder text for the input.               |          |
| `readonly`              | `boolean`                        | If `true`, the text input is read-only.           | `false`  |
| `disabled`              | `boolean`                        | If `true`, the text input is disabled.            | `false`  |
| `cleaveOptions`         | `CleaveOptions`                  | Cleave.js options for formatting the input value. |          |
| `validationRules`       | `string[]`                       | Array of validation rules for the input.          | `[]`     |
| `validationMessage`     | `string \| null`                 | Custom validation error message.                  |          |
| `size`                  | `'small' \| 'medium' \| 'large'` | The size of the text input.                       | `medium` |
| `validationHideMessage` | `boolean \| null`                | If `true`, hides the validation error message.    |          |

### Callbacks

| Name        | Description                                   | Arguments  |
| ----------- | --------------------------------------------- | ---------- |
| `onInput`   | Callback function triggered on input change.  | `e: Event` |
| `onBlur`    | Callback function triggered on input blur.    | `e: Event` |
| `onChange`  | Callback function triggered on input change.  | `e: Event` |
| `onFocus`   | Callback function triggered on input focus.   | `e: Event` |
| `onKeydown` | Callback function triggered on keydown event. | `e: Event` |
| `onKeyup`   | Callback function triggered on keyup event.   | `e: Event` |

### Interfaces

### `TextInputType`

The `TextInputType` is a union type representing different types of text inputs:

-   `'password'`
-   `'search'`
-   `'text'`
-   `'date'`
-   `'time'`
-   `'datetime-local'`
-   `'multiline'`
