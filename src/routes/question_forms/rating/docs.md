### Properties

### `RatingProps`

| Property          | Type                         | Description                                                             |
| ----------------- | ---------------------------- | ----------------------------------------------------------------------- |
| `id`              | `string`                     | The unique identifier for the component.                                |
| `labels`          | `RatingProperties['labels']` | Array of objects representing rating options with labels and values.    |
| `[order]`         | `RatingProperties['order']`  | The order in which the labels are displayed.                            |
| `[layout]`        | `RatingProperties['layout']` | The layout of the rating component. Options: '1' (default) or 'slider'. |
| `[response={[]}]` | `RatingValue[]`              | Array containing the selected rating options.                           |

### Callbacks

| Name               | Description                                             | Type                                   |
| ------------------ | ------------------------------------------------------- | -------------------------------------- |
| `onRatingResponse` | Callback triggered when the rating response is changed. | `event: ComponentEvent<RatingValue[]>` |
