#### Properties

#### `MultipleChoiceProps`

| Property   | Type                                 | Description                                                                                                     | Default   |
| ---------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- | --------- |
| `id`       | `string`                             | The unique identifier for the component.                                                                        |           |
| `labels`   | `MultipleChoiceProperties['labels']` | An array of labels representing the choices.                                                                    |           |
| `multi`    | `MultipleChoiceProperties['multi']`  | If set to `true`, allows selecting multiple choices; otherwise, only one.                                       |           |
| `layout`   | `MultipleChoiceProperties['layout']` | The layout style for rendering choices (`'1'` for vertical, `'2'` for horizontal, `'dropdown'` for a dropdown). | `'1'`     |
| `random`   | `MultipleChoiceProperties['random']` | If set to `true`, the order of choices will be randomized.                                                      | `false`   |
| `other`    | `MultipleChoiceProperties['other']`  | Text representing an 'Other' option. If present, users can input custom text.                                   | `'Other'` |
| `response` | `MultipleChoiceValue[]`              | Array of multiple choice values containing label-value pairs.                                                   | `[]`      |

#### Callbacks

| Name                       | Description                                                      | Arguments                         |
| -------------------------- | ---------------------------------------------------------------- | --------------------------------- |
| `onMultipleChoiceResponse` | Callback triggered when the multiple choice response is changed. | `response: MultipleChoiceValue[]` |
