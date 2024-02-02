# Radio Component

The `Radio` component allows users to make a single selection from a list of options.

### Properties

#### `RadioProps`

| Property       | Type                             | Description                                             |
| -------------- | -------------------------------- | ------------------------------------------------------- |
| `id`           | `string`                         | The unique identifier for the radio input.              |
| `name`         | `string`                         | The name of the radio group to which the radio belongs. |
| `value`        | `string`                         | The value associated with the radio input.              |
| `label`        | `string`                         | The label displayed next to the radio input.            |
| `checked`      | `boolean`                        | Flag indicating whether the radio input is checked.     |
| `disabled`     | `boolean`                        | Flag indicating whether the radio input is disabled.    |
| `prependLabel` | `boolean`                        | Flag to prepend the label to the radio input.           |
| `size`         | `'small' \| 'medium' \| 'large'` | Size of the radio input.                                |

### Callbacks

| Name       | Description                           | Type                  |
| ---------- | ------------------------------------- | --------------------- |
| `onChange` | Event handler for radio input change. | `(e: Event) => void;` |
