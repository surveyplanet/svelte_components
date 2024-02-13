### Properties
| Property                                         | Type             | Description                                                 |
| ------------------------------------------------ | ---------------- | ----------------------------------------------------------- |
| `id={(Date.now() + Math.random()).toString(36)}` | `string`         | The unique identifier for the toggle.                       |
| `name`                                           | `string`         | The name attribute of the toggle.                           |
| `disabled={false}`                               | `boolean`        | If `true`, the toggle is disabled.                          |
| `on={false}`                                     | `boolean`        | The current state of the toggle (on/off).                   |
| `tall={false}`                                   | `boolean`        | If `true`, the toggle is tall, providing a larger hit area. |
| `label={null}`                                   | `string \| null` | The label or text associated with the toggle.               |
| `prependLabel={false}`                           | `boolean`        | If `true`, the label is prepended to the toggle.            |

### Callbacks

| Name             | Description                                  | Type          |
| ---------------- | -------------------------------------------- | ------------- |
| `onToggleChange` | Callback function triggered on state change. | `on: boolean` |
