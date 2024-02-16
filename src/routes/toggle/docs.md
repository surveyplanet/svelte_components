### Properties
| Property         | Type             | Description                                                 |
| ---------------- | ---------------- | ----------------------------------------------------------- |
| `[id]`           | `string`         | The unique identifier for the toggle.                       |
| `[name]`         | `string`         | The name attribute of the toggle.                           |
| `[disabled]`     | `boolean`        | If `true`, the toggle is disabled.                          |
| `[on]`           | `boolean`        | The current state of the toggle (on/off).                   |
| `[tall]`         | `boolean`        | If `true`, the toggle is tall, providing a larger hit area. |
| `[label]`        | `string \| null` | The label or text associated with the toggle.               |
| `[prependLabel]` | `boolean`        | If `true`, the label is prepended to the toggle.            |

### Callbacks

| Name             | Description                                  | Type                                          |
| ---------------- | -------------------------------------------- | --------------------------------------------- |
| `onToggleChange` | Callback function triggered on state change. | `event: ComponentEvent<boolean \| undefined>` |
