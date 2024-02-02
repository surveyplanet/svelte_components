# Form Component

The `Form` component allows users to input text responses for a set of predefined labels.

### Properties

#### `FormProps`

| Property   | Type                       | Description                                                       |
| ---------- | -------------------------- | ----------------------------------------------------------------- |
| `id`       | `string`                   | The unique identifier for the component.                          |
| `labels`   | `FormProperties['labels']` | An array of labels for which text responses need to be collected. |
| `random`   | `FormProperties['random']` | If set to `true`, the labels will be displayed in a random order. |
| `response` | `FormValue[]`              | Array of form values containing label-value pairs.                |

### Callbacks

| Name             | Description                                           | Type                              |
| ---------------- | ----------------------------------------------------- | --------------------------------- |
| `onFormResponse` | Callback triggered when the form response is changed. | `(response: FormValue[]) => void` |
