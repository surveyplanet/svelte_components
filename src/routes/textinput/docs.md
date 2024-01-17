### Properties

| Property                | Type     | Description                                                                              |
| ----------------------- | -------- | ---------------------------------------------------------------------------------------- |
| `value=null`            | String   | The initial value of the input.                                                          |
| `label=null`            | String   | The input label text. If no label text is give not label tag will be rendered.           |
| `placeholder=null`      | String   | The input placeholder text.                                                              |
| `multiline=false`       | Boolean  | Whether the input should accept multiple lines.                                          |
| `disabled=false`        | Boolean  | Whether the input is disabled or not.                                                    |
| `readonly=false`        | Boolean  | Whether the input is read only or not.                                                   |
| `attr=null`             | Object   | Arbitrary attributes to be attached to the input.                                        |
| `validate`              | String   | See validator utilities.                                                                 |
| `validationRules=[]`    | String[] | A list of validation rules for the input. See: https://github.com/surveyplanet/utilities |
| `validationMessage`     | String   | A custom validation message to be used instead of the default                            |
| `validationHideMessage` | Boolean  | Whether to automatically show the validation error message or not.                       |
| `cleaveOptions`         | Object   | Cleave.js options for masked input. See: https://github.com/nosir/cleave.js              |

### Events

| Name      | Returns     | Description                                                   |
| --------- | ----------- | ------------------------------------------------------------- |
| `focus`   | CustomEvent | Dispatched when the input is in focus.                        |
| `blur`    | CustomEvent | Dispatched when the input loses focus.                        |
| `input`   | CustomEvent | Dispatched when the input value has changed.                  |
| `change`  | CustomEvent | Dispatched when the input value has changed and looses focus. |
| `keydown` | CustomEvent | Dispatched when a key is fully depressed.                     |
| `keyup`   | CustomEvent | Dispatched when a key is fully released.                      |
