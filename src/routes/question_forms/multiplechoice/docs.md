### Properties

### `MultipleChoiceProps`

| Property          | Type                                 | Description                                                                                                     |
| ----------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `id`              | `string`                             | The unique identifier for the component.                                                                        |
| `labels`          | `MultipleChoiceProperties['labels']` | An array of labels representing the choices.                                                                    |
| `[multi]`         | `MultipleChoiceProperties['multi']`  | If set to `true`, allows selecting multiple choices; otherwise, only one.                                       |
| `[layout={1}]`    | `MultipleChoiceProperties['layout']` | The layout style for rendering choices (`'1'` for vertical, `'2'` for horizontal, `'dropdown'` for a dropdown). |
| `[random]`        | `MultipleChoiceProperties['random']` | If set to `true`, the order of choices will be randomized.                                                      |
| `[other]`         | `MultipleChoiceProperties['other']`  | Text representing an 'Other' option. If present, users can input custom text.                                   |
| `[response={[]}]` | `MultipleChoiceValue[]`              | Array of multiple choice values containing label-value pairs.                                                   |

### Callbacks

| Name                       | Description                                                      | Arguments                                      |
| -------------------------- | ---------------------------------------------------------------- | ---------------------------------------------- |
| `onMultipleChoiceResponse` | Callback triggered when the multiple choice response is changed. | `event: ComponentEvent<MultipleChoiceValue[]>` |
