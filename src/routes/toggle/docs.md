### Properties

| Property         | Type      | Description                                                 |
| ---------------- | --------- | ----------------------------------------------------------- |
| `[on=false]`     | `boolean` | Whether the toggle is on or not.                            |
| `[id]`           | `string`  | The unique identifier for the toggle.                       |
| `[name]`         | `string`  | The name attribute of the toggle.                           |
| `[disabled]`     | `boolean` | If `true`, the toggle is disabled.                          |
| `[tall]`         | `boolean` | If `true`, the toggle is tall, providing a larger hit area. |
| `[label]`        | `string`  | The label associated with the toggle.                       |
| `[prependLabel]` | `boolean` | If `true`, the label is prepended to the toggle.            |

### Callbacks

| Name             | Description                                  | Type                             |
| ---------------- | -------------------------------------------- | -------------------------------- |
| `onToggleChange` | Callback function triggered on state change. | `event: ComponentEvent<boolean>` |
