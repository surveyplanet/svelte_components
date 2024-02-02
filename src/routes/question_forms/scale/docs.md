# Scale Component

The `Scale` component allows users to provide a numerical response within a specified range.

### Properties

#### `ScaleProps`

| Property   | Type                     | Description                                 |
| ---------- | ------------------------ | ------------------------------------------- |
| `id`       | `string`                 | The unique identifier for the component.    |
| `min`      | `ScaleProperties['min']` | The minimum value of the scale.             |
| `max`      | `ScaleProperties['max']` | The maximum value of the scale.             |
| `response` | `ScaleValue[]`           | Array containing the selected scale values. |

### Callbacks

| Name              | Description                                            | Type                               |
| ----------------- | ------------------------------------------------------ | ---------------------------------- |
| `onScaleResponse` | Callback triggered when the scale response is changed. | `(response: ScaleValue[]) => void` |
