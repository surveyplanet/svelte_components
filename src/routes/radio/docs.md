### Properties

| Property         | Type                             | Description                                                                                 |
| ---------------- | -------------------------------- | ------------------------------------------------------------------------------------------- |
| `data`           | RadioData                        | Data for the radio.                                                                         |
| `group=''`       | string                           | Group name the radio belongs to. See: https://svelte.dev/docs/element-directives#bind-group |
| `[prependLabel]` | boolean                          | Flag to prepend the label to the radio input.                                               |
| `[size='small']` | 'small' \| 'medium' \| 'large'   | Size of the radio input.                                                                    |
| `[block]`        | boolean                          | If `true`, the radio input will take up the full width of its container.                    |
| `[...attr] `     | HTMLAttributes<HTMLInputElement> | Additional attributes to be expanded on to primary the node.                                |

### Callbacks

| Name            | Description                           | Arguments                        |
| --------------- | ------------------------------------- | -------------------------------- |
| `onRadioChange` | Event handler for radio input change. | `event: ComponentEvent<boolean>` |

### Interfaces

#### `RadioData`

The data for the radio includes:

| Property | Type                | Description                                |
| -------- | ------------------- | ------------------------------------------ |
| `html`   | string              | HTML to be rendered for the radio input.   |
| `label`  | string              | Label for the radio input.                 |
| `...`    | HTMLInputAttributes | Additional attributes for the radio input. |
