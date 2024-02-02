# Range Component

The `Range` component allows users to select a range of values using a slider.

### Properties

#### `RangeProps`

| Property   | Type           | Description                                 |
| ---------- | -------------- | ------------------------------------------- |
| `id`       | `string`       | The unique identifier for the component.    |
| `min`      | `number`       | The minimum value of the range.             |
| `max`      | `number`       | The maximum value of the range.             |
| `response` | `RangeValue[]` | Array containing the selected range values. |

### Callbacks

| Name              | Description                                            | Type                               |
| ----------------- | ------------------------------------------------------ | ---------------------------------- |
| `onRangeResponse` | Callback triggered when the range response is changed. | `(response: RangeValue[]) => void` |
