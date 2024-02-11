### Properties

### `SpinnerProps`

| Property      | Type                             | Description                                                       | Default                                     |
| ------------- | -------------------------------- | ----------------------------------------------------------------- | ------------------------------------------- |
| `label`       | `string`                         | The label displayed next to the spinner input.                    | `''`                                        |
| `id`          | `string`                         | The unique identifier for the spinner input.                      | `(Date.now() + Math.random()).toString(36)` |
| `step`        | `number`                         | The step value for the spinner input.                             | `1`                                         |
| `min`         | `number`                         | The minimum value for the spinner input.                          | `0`                                         |
| `max`         | `number`                         | The maximum value for the spinner input.                          | `100`                                       |
| `value`       | `number`                         | The value of the spinner input.                                   |                                             |
| `disabled`    | `boolean`                        | Flag indicating whether the spinner input is disabled.            | `false`                                     |
| `required`    | `boolean`                        | Flag indicating whether the spinner input is required.            | `false`                                     |
| `overflow`    | `boolean`                        | Flag indicating whether the spinner input should overflow.        | `false`                                     |
| `dragSpeed`   | `number`                         | The speed at which the spinner input value changes when dragging. | `10`                                        |
| `placeholder` | `string`                         | The placeholder text for the spinner input.                       | `null`                                      |
| `size`        | `'small' \| 'medium' \| 'large'` | Size of the spinner input.                                        | `'small'`                                   |

### Callbacks

| Name       | Description                                  | Arguments                    |
| ---------- | -------------------------------------------- | ---------------------------- |
| `onUpdate` | Callback function triggered on value update. | `value: number \| undefined` |
| `onInput`  | Callback function triggered on input change. | `value: number \| undefined` |
| `onChange` | Callback function triggered on value change. | `value: number \| undefined` |
| `onBlur`   | Callback function triggered on input blur.   | `undefined`                  |
| `onFocus`  | Callback function triggered on input focus.  | `undefined`                  |
