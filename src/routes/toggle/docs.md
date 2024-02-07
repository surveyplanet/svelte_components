#### Properties

| Property       | Type             | Description                                                 | Default                                     |
| -------------- | ---------------- | ----------------------------------------------------------- | ------------------------------------------- |
| `id`           | `string`         | The unique identifier for the toggle.                       | `(Date.now() + Math.random()).toString(36)` |
| `name`         | `string`         | The name attribute of the toggle.                           |                                             |
| `disabled`     | `boolean`        | If `true`, the toggle is disabled.                          | `false`                                     |
| `on`           | `boolean`        | The current state of the toggle (on/off).                   | `false`                                     |
| `tall`         | `boolean`        | If `true`, the toggle is tall, providing a larger hit area. | `false`                                     |
| `label`        | `string \| null` | The label or text associated with the toggle.               | `null`                                      |
| `prependLabel` | `boolean`        | If `true`, the label is prepended to the toggle.            | `false`                                     |

#### Callbacks

| Name       | Description                                  | Type          |
| ---------- | -------------------------------------------- | ------------- |
| `onChange` | Callback function triggered on state change. | `on: boolean` |
