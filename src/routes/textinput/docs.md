### Properties

| Property                  | Type                             | Description                                       |
| ------------------------- | -------------------------------- | ------------------------------------------------- |
| `[id]`                    | string                           | The unique identifier for the text input.         |
| `[name]`                  | string                           | The name attribute of the text input.             |
| `[type]`                  | TextInputType                    | The type of the text input.                       |
| `[value]`                 | string                           | The current value of the text input.              |
| `[label]`                 | string                           | The label or title for the text input.            |
| `[placeholder]`           | string                           | The placeholder text for the input.               |
| `[readonly]`              | boolean                          | If `true`, the text input is read-only.           |
| `[disabled]`              | boolean                          | If `true`, the text input is disabled.            |
| `[cleaveOptions]`         | CleaveOptions                    | Cleave.js options for formatting the input value. |
| `[validationRules]`       | string[]                         | Array of validation rules for the input.          |
| `[validationMessage]`     | string                           | Custom validation error message.                  |
| `[size='small']`          | 'small' \| 'medium' \| 'large'   | The size of the text input.                       |
| `[validationHideMessage]` | boolean                          | If `true`, hides the validation error message.    |
| `[...attr] `              | HTMLAttributes<HTMLInputElement> | Other attributes to be spread on the element.     |

### Callbacks

| Name                 | Description                                   | Arguments                          |
| -------------------- | --------------------------------------------- | ---------------------------------- |
| `onTextInputInput`   | Callback function triggered on input change.  | `event: ComponentEvent<string>`    |
| `onTextInputChange`  | Callback function triggered on input change.  | `event: ComponentEvent<string>`    |
| `onTextInputKeydown` | Callback function triggered on keydown event. | `event: ComponentEvent<string>`    |
| `onTextInputKeyup`   | Callback function triggered on keyup event.   | `event: ComponentEvent<string>`    |
| `onTextInputBlur`    | Callback function triggered on input blur.    | `event: ComponentEvent<undefined>` |
| `onTextInputFocus`   | Callback function triggered on input focus.   | `event: ComponentEvent<undefined>` |

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
