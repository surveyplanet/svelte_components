### Properties

| Property         | Type                             | Description                                                                                         |
| ---------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| `[group]`        | string                           | Group name the radio belongs to. See: https://svelte.dev/docs/element-directives#bind-group         |
| `[value]`        | string                           | The value associated with the radio input.                                                          |
| `[label]`        | string                           | The label displayed next to the radio input.                                                        |
| `[checked]`      | boolean                          | Flag indicating whether the radio input is checked.                                                 |
| `[disabled]`     | boolean                          | Flag indicating whether the radio input is disabled.                                                |
| `[prependLabel]` | boolean                          | Flag to prepend the label to the radio input.                                                       |
| `[size='small']` | 'small' \| 'medium' \| 'large'   | Size of the radio input.                                                                            |
| `[...attr] `     | HTMLAttributes<HTMLInputElement> | Additional attributes to be expanded on to primary the node.                                        |

### Callbacks

| Name            | Description                           | Arguments                        |
| --------------- | ------------------------------------- | -------------------------------- |
| `onRadioChange` | Event handler for radio input change. | `event: ComponentEvent<boolean>` |
