# Essay Component

The `Essay` component is used to capture free-form text responses in a survey question.

### Properties

#### `EssayProps`

| Property   | Type           | Description                                                        |
| ---------- | -------------- | ------------------------------------------------------------------ |
| `id`       | `string`       | The unique identifier for the component.                           |
| `min`      | `number`       | Minimum allowed characters for the essay response.                 |
| `max`      | `number`       | Maximum allowed characters for the essay response.                 |
| `single`   | `boolean`      | Flag to determine whether the essay is a single-line or multiline. |
| `response` | `EssayValue[]` | Array of essay values.                                             |

### Callbacks

| Name              | Description                                            | Type                               |
| ----------------- | ------------------------------------------------------ | ---------------------------------- |
| `onEssayResponse` | Callback triggered when the essay response is changed. | `(response: EssayValue[]) => void` |
