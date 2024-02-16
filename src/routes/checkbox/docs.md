### Properties

| Property         | Type    | Description                                                                |
| ---------------- | ------- | -------------------------------------------------------------------------- |
| `[id]`           | String  | ID of the checkbox. If not provided, a random unique ID will be generated. |
| `[name]`         | String  | Name of the checkbox.                                                      |
| `[value]`        | String  | Value of the checkbox.                                                     |
| `[label]`        | String  | Label text for the checkbox.                                               |
| `[checked]`      | Boolean | Initial checked state of the checkbox.                                     |
| `[disabled]`     | Boolean | Disables the checkbox if `true`.                                           |
| `[prependLabel]` | Boolean | Positions the label before the checkbox if `true`.                         |
| `[size='small']` | String  | Size of the checkbox: `'small'`, `'medium'`, `'large'`.                    |

### Callbacks

| Name               | Description                            | Arguments                        |
| ------------------ | -------------------------------------- | -------------------------------- |
| `onCheckboxChange` | Change event handler for the checkbox. | `event: ComponentEvent<boolean>` |
