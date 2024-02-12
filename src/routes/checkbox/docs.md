### Properties

| Property                                       | Type    | Description                                                                |
| ---------------------------------------------- | ------- | -------------------------------------------------------------------------- |
| `id=(Date.now() + Math.random()).toString(36)` | String  | ID of the checkbox. If not provided, a random unique ID will be generated. |
| `name`                                         | String  | Name of the checkbox.                                                      |
| `value=null`                                   | String  | Value of the checkbox.                                                     |
| `label=''`                                     | String  | Label text for the checkbox.                                               |
| `checked`                                      | Boolean | Initial checked state of the checkbox.                                     |
| `disabled=false`                               | Boolean | Disables the checkbox if `true`.                                           |
| `prependLabel=false`                           | Boolean | Positions the label before the checkbox if `true`.                         |
| `size='medium'`                                | String  | Size of the checkbox: `'small'`, `'medium'`, `'large'`.                    |

### Callbacks

| Name               | Description                            |
| ------------------ | -------------------------------------- |
| `onCheckboxChange` | Change event handler for the checkbox. |
