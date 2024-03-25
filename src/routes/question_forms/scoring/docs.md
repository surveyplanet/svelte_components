### Properties

### `ScoringProps`

| Property                  | Type                               | Description                                                        |
| ------------------------- | ---------------------------------- | ------------------------------------------------------------------ |
| `[id]`                    | string                             | The unique identifier for the component.                           |
| `definitions`             | ScoringDefinitions                 | Definitions for text elements within the component.                |
| `values`                  | ScoringProperties['values']        | Array containing the numerical values corresponding to the labels. |
| `labels`                  | ScoringProperties['labels']        | Array containing the labels for scoring.                           |
| `[maxLabel]`              | ScoringProperties['maxLabel']      | Label for the maximum score.                                       |
| `[minLabel]`              | ScoringProperties['minLabel']      | Label for the minimum score.                                       |
| `[requireAll={false}]`    | ScoringProperties['requireAll']    | Indicates if all labels must receive a score.                      |
| `[requireUnique={false}]` | ScoringProperties['requireUnique'] | Indicates if each label must have a unique score.                  |
| `[response={[]}]`         | ScoringValue[]                     | Array containing the selected scoring values.                      |
| `[...attr] `              | HTMLAttributes<HTMLFormElement>    | Additional attributes to be expanded on to primary the node.       |

### Callbacks

| Name                | Description                                              | Arguments                               |
| ------------------- | -------------------------------------------------------- | --------------------------------------- |
| `onScoringResponse` | Callback triggered when the scoring response is changed. | `event: ComponentEvent<ScoringValue[]>` |

### `ScoringDefinitions`

| Property             | Type                                            | Description                                   |
| -------------------- | ----------------------------------------------- | --------------------------------------------- |
| `scoringResetButton` | `Language['definitions']['scoringResetButton']` | Text definition for the scoring reset button. |
