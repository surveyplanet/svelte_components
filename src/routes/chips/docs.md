### Properties

| Property        | Type                            | Description                                   |
| --------------- | ------------------------------- | --------------------------------------------- |
| `data`          | ChipData[]                      | Array of objects representing the chips.      |
| `[selectable]`  | Boolean                         | Enables chip selection if `true`.             |
| `[multiSelect]` | Boolean                         | Allows multiple chip selection if `true`.     |
| `[removable]`   | Boolean                         | Enables chip removal if `true`.               |
| `[...attr] `    | HTMLAttributes<HTMLMenuElement> | Other attributes to be spread on the element. |

### Callbacks

| Name            | Description                         | Arguments                           |
| --------------- | ----------------------------------- | ----------------------------------- |
| `onChipsClick`  | Click event handler for the chips.  | `event: ComponentEvent<ChipData[]>` |
| `onChipsRemove` | Remove event handler for the chips. | `event: ComponentEvent<ChipData[]>` |

### Interfaces

#### `ChipData`

| Property   | Description                        |
| ---------- | ---------------------------------- |
| `id`       | Identifier for the chip.           |
| `label`    | Label text for the chip.           |
| `selected` | Indicates if the chip is selected. |
