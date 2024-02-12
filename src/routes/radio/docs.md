### Properties



| Property                                        | Type                             | Description                                             |
| ----------------------------------------------- | -------------------------------- | ------------------------------------------------------- |
| `id={Date.now() + Math.random()).toString(36)}` | `string`                         | The unique identifier for the radio input.              |
| `name`                                          | `string`                         | The name of the radio group to which the radio belongs. |
| `value={null}`                                  | `string`                         | The value associated with the radio input.              |
| `label={''}`                                    | `string`                         | The label displayed next to the radio input.            |
| `checked={false}`                               | `boolean`                        | Flag indicating whether the radio input is checked.     |
| `disabled={false}`                              | `boolean`                        | Flag indicating whether the radio input is disabled.    |
| `prependLabel={false}`                          | `boolean`                        | Flag to prepend the label to the radio input.           |
| `size={'small'}`                                | `'small' \| 'medium' \| 'large'` | Size of the radio input.                                |

### Callbacks

| Name            | Description                           | Arguments  |
| --------------- | ------------------------------------- | ---------- |
| `onRadioChange` | Event handler for radio input change. | `e: Event` |
