### Properties

### `EssayProps`

| Property          | Type                            | Description                                                        |
| ----------------- | ------------------------------- | ------------------------------------------------------------------ |
| `[id]`            | string                          | The unique identifier for the component.                           |
| `[min]`           | number                          | Minimum allowed characters for the essay response.                 |
| `[max]`           | number                          | Maximum allowed characters for the essay response.                 |
| `[single]`        | boolean                         | Flag to determine whether the essay is a single-line or multiline. |
| `[response={[]}]` | EssayValue[]                    | Array of essay values.                                             |
| `[...attr] `      | HTMLAttributes<HTMLFormElement> | Additional attributes to be expanded on to primary the node.       |

### Callbacks

| Name              | Description                                            | Arguments                             |
| ----------------- | ------------------------------------------------------ | ------------------------------------- |
| `onEssayResponse` | Callback triggered when the essay response is changed. | `event: ComponentEvent<EssayValue[]>` |
