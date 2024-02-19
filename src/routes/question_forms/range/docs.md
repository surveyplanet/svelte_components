### Properties

### `RangeProps`

| Property          | Type                            | Description                                   |
| ----------------- | ------------------------------- | --------------------------------------------- |
| `[id]`            | string                          | The unique identifier for the component.      |
| `min`             | number                          | The minimum value of the range.               |
| `max`             | number                          | The maximum value of the range.               |
| `[response={[]}]` | RangeValue[]                    | Array containing the selected range values.   |
| `[...attr] `      | HTMLAttributes<HTMLFormElement> | Other attributes to be spread on the element. |

### Callbacks

| Name              | Description                                            | Arguments                             |
| ----------------- | ------------------------------------------------------ | ------------------------------------- |
| `onRangeResponse` | Callback triggered when the range response is changed. | `event: ComponentEvent<RangeValue[]>` |
