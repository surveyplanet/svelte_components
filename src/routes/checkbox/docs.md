### Properties

| Property             | Type    | Description                                                     |
| -------------------- | ------- | --------------------------------------------------------------- |
| `type='checkbox'`    | String  | Whether this should be a `checkbox` or `radio` input.           |
| `id=null`            | String  | The unique id of the input (required).                          |
| `value=null`         | String  | The input value (required).                                     |
| `label=null`         | String  | The label text. If no value is given no label is rendered.      |
| `checked=false`      | Boolean | Whether the input is checked or not.                            |
| `attr={}`            | Object  | Any additional attributes that need to be applied to the input. |
| `disabled`           | Boolean | Whether the input should be disabled or not.                    |
| `prependLabel=false` | Boolean | Whether the label should be prepended.                          |

### Events

| Name     | Properties | Description                                                   |
| -------- | ---------- | ------------------------------------------------------------- |
| `change` | event      | Dispatched after the component has been checked or unchecked. |
