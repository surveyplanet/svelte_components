#### Properties

| Property       | Type    | Description                                                                | Default                                     |
| -------------- | ------- | -------------------------------------------------------------------------- | ------------------------------------------- |
| `id`           | String  | ID of the checkbox. If not provided, a random unique ID will be generated. | `(Date.now() + Math.random()).toString(36)` |
| `name`         | String  | Name of the checkbox.                                                      |                                             |
| `value`        | String  | Value of the checkbox.                                                     | `null`                                      |
| `label`        | String  | Label text for the checkbox.                                               | `''`                                        |
| `checked`      | Boolean | Initial checked state of the checkbox.                                     |                                             |
| `disabled`     | Boolean | Disables the checkbox if `true`.                                           | `false`                                     |
| `prependLabel` | Boolean | Positions the label before the checkbox if `true`.                         | `false`                                     |
| `size`         | String  | Size of the checkbox: `'small'`, `'medium'`, `'large'`.                    | `'medium'`                                  |

#### Callbacks

| Name       | Description                            | Arguments   |
| ---------- | -------------------------------------- | ----------- |
| `onChange` | Change event handler for the checkbox. | `undefined` |
