### Properties

### `SpinnerProps`

| Property                                         | Type                             | Description                                                       |
| ------------------------------------------------ | -------------------------------- | ----------------------------------------------------------------- |
| `label={''}`                                     | `string`                         | The label displayed next to the spinner input.                    |
| `id={(Date.now() + Math.random()).toString(36)}` | `string`                         | The unique identifier for the spinner input.                      |
| `step={1}`                                       | `number`                         | The step value for the spinner input.                             |
| `min={0}`                                        | `number`                         | The minimum value for the spinner input.                          |
| `max={100}`                                      | `number`                         | The maximum value for the spinner input.                          |
| `value`                                          | `number`                         | The value of the spinner input.                                   |
| `disabled={false}`                               | `boolean`                        | Flag indicating whether the spinner input is disabled.            |
| `required={false}`                               | `boolean`                        | Flag indicating whether the spinner input is required.            |
| `overflow={false}`                               | `boolean`                        | Flag indicating whether the spinner input should overflow.        |
| `dragSpeed={10}`                                 | `number`                         | The speed at which the spinner input value changes when dragging. |
| `placeholder={null}`                             | `string`                         | The placeholder text for the spinner input.                       |
| `size={'small'}`                                 | `'small' \| 'medium' \| 'large'` | Size of the spinner input.                                        |

### Callbacks

| Name              | Description                                  | Arguments                    |
| ----------------- | -------------------------------------------- | ---------------------------- |
| `onSpinnerUpdate` | Callback function triggered on value update. | `value: number \| undefined` |
| `onSpinnerInput`  | Callback function triggered on input change. | `value: number \| undefined` |
| `onSpinnerChange` | Callback function triggered on value change. | `value: number \| undefined` |
| `onSpinnerBlur`   | Callback function triggered on input blur.   | `undefined`                  |
| `onSpinnerFocus`  | Callback function triggered on input focus.  | `undefined`                  |
