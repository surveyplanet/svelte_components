### Properties

| Property      | Type       | Description                               |
| ------------- | ---------- | ----------------------------------------- |
| `data`        | ChipData[] | Array of objects representing the chips.  |
| `selectable`  | Boolean    | Enables chip selection if `true`.         |
| `multiSelect` | Boolean    | Allows multiple chip selection if `true`. |
| `removable`   | Boolean    | Enables chip removal if `true`.           |

### Callbacks

| Name            | Description                         | Arguments          |
| --------------- | ----------------------------------- | ------------------ |
| `onChipsClick`  | Click event handler for the chips.  | `data: ChipData[]` |
| `onChipsRemove` | Remove event handler for the chips. | `data: ChipData[]` |

### Interfaces

#### `ChipData`

| Property   | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| `id`       | String  | Identifier for the chip.           |
| `label`    | String  | Label text for the chip.           |
| `selected` | Boolean | Indicates if the chip is selected. |
