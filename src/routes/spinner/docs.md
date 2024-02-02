# Spinner Component

The `Spinner` component provides a numeric input with increment and decrement buttons for easy value manipulation.

### Properties

#### `SpinnerProps`

| Property      | Type                             | Description                                                       |
| ------------- | -------------------------------- | ----------------------------------------------------------------- |
| `label`       | `string`                         | The label displayed next to the spinner input.                    |
| `id`          | `string`                         | The unique identifier for the spinner input.                      |
| `step`        | `number`                         | The step value for the spinner input.                             |
| `min`         | `number`                         | The minimum value for the spinner input.                          |
| `max`         | `number`                         | The maximum value for the spinner input.                          |
| `value`       | `number`                         | The value of the spinner input.                                   |
| `disabled`    | `boolean`                        | Flag indicating whether the spinner input is disabled.            |
| `required`    | `boolean`                        | Flag indicating whether the spinner input is required.            |
| `overflow`    | `boolean`                        | Flag indicating whether the spinner input should overflow.        |
| `dragSpeed`   | `number`                         | The speed at which the spinner input value changes when dragging. |
| `placeholder` | `string`                         | The placeholder text for the spinner input.                       |
| `size`        | `'small' \| 'medium' \| 'large'` | Size of the spinner input.                                        |

### Callbacks

| Name       | Description                                  | Type                                   |
| ---------- | -------------------------------------------- | -------------------------------------- |
| `onUpdate` | Callback function triggered on value update. | `(value: number \| undefined) => void` |
| `onInput`  | Callback function triggered on input change. | `(value: number \| undefined) => void` |
| `onChange` | Callback function triggered on value change. | `(value: number \| undefined) => void` |
| `onBlur`   | Callback function triggered on input blur.   | `() => void`                           |
| `onFocus`  | Callback function triggered on input focus.  | `() => void`                           |
