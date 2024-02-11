### Properties

| Property      | Type       | Description                               | Default |
| ------------- | ---------- | ----------------------------------------- | ------- |
| `data`        | ChipData[] | Array of objects representing the chips.  |         |
| `selectable`  | Boolean    | Enables chip selection if `true`.         | `false` |
| `multiSelect` | Boolean    | Allows multiple chip selection if `true`. | `false` |
| `removable`   | Boolean    | Enables chip removal if `true`.           | `false` |

### Callbacks

| Name       | Description                         | Arguments          |
| ---------- | ----------------------------------- | ------------------ |
| `onClick`  | Click event handler for the chips.  | `data: ChipData[]` |
| `onRemove` | Remove event handler for the chips. | `data: ChipData[]` |

### Interfaces

### `ChipData`

| Property   | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| `id`       | String  | Identifier for the chip.           |
| `label`    | String  | Label text for the chip.           |
| `selected` | Boolean | Indicates if the chip is selected. |
