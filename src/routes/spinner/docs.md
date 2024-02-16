### Properties

### `SpinnerProps`

| Property           | Type                             | Description                                                       |
| ------------------ | -------------------------------- | ----------------------------------------------------------------- |
| `[label]`          | `string`                         | The label displayed next to the spinner input.                    |
| `[id]`             | `string`                         | The unique identifier for the spinner input.                      |
| `[step={1}]`       | `number`                         | The step value for the spinner input.                             |
| `min`              | `number`                         | The minimum value for the spinner input.                          |
| `max`              | `number`                         | The maximum value for the spinner input.                          |
| `[value]`          | `number`                         | The value of the spinner input.                                   |
| `[disabled]`       | `boolean`                        | Flag indicating whether the spinner input is disabled.            |
| `[required]`       | `boolean`                        | Flag indicating whether the spinner input is required.            |
| `[overflow]`       | `boolean`                        | Flag indicating whether the spinner input should overflow.        |
| `[dragSpeed={10}]` | `number`                         | The speed at which the spinner input value changes when dragging. |
| `[placeholder]`    | `string`                         | The placeholder text for the spinner input.                       |
| `[size='small']`   | `'small' \| 'medium' \| 'large'` | Size of the spinner input.                                        |

### Callbacks

| Name              | Description                                  | Arguments                                    |
| ----------------- | -------------------------------------------- | -------------------------------------------- |
| `onSpinnerUpdate` | Callback function triggered on value update. | `event: ComponentEvent<number \| undefined>` |
| `onSpinnerInput`  | Callback function triggered on input change. | `event: ComponentEvent<number \| undefined>` |
| `onSpinnerChange` | Callback function triggered on value change. | `event: ComponentEvent<number \| undefined>` |
| `onSpinnerBlur`   | Callback function triggered on input blur.   | `event: ComponentEvent<undefined>`           |
| `onSpinnerFocus`  | Callback function triggered on input focus.  | `event: ComponentEvent<undefined>`           |
