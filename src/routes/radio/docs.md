#### Properties

#### `RadioProps`

| Property       | Type                             | Description                                             | Default                                     |
| -------------- | -------------------------------- | ------------------------------------------------------- | ------------------------------------------- |
| `id`           | `string`                         | The unique identifier for the radio input.              | `(Date.now() + Math.random()).toString(36)` |
| `name`         | `string`                         | The name of the radio group to which the radio belongs. |                                             |
| `value`        | `string`                         | The value associated with the radio input.              | `null`                                      |
| `label`        | `string`                         | The label displayed next to the radio input.            | `''`                                        |
| `checked`      | `boolean`                        | Flag indicating whether the radio input is checked.     | `false`                                     |
| `disabled`     | `boolean`                        | Flag indicating whether the radio input is disabled.    | `false`                                     |
| `prependLabel` | `boolean`                        | Flag to prepend the label to the radio input.           | `false`                                     |
| `size`         | `'small' \| 'medium' \| 'large'` | Size of the radio input.                                | `'small'`                                   |

#### Callbacks

| Name       | Description                           | Type       |
| ---------- | ------------------------------------- | ---------- |
| `onChange` | Event handler for radio input change. | `e: Event` |
