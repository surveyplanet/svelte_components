### Properties

| Property  | Type                | Description                                |
| --------- | ------------------- | ------------------------------------------ |
| `[value]` | string              | The value of the control.                  |
| `...`     | HTMLInputAttributes | Additional attributes for the radio input. |

### Callbacks

| Property              | Description                                  | Arguments                                         |
| --------------------- | -------------------------------------------- | ------------------------------------------------- |
| `onColorPickerChange` | Change event handler for the color selector. | `event: ComponentEvent<string, HTMLInputElement>` |
| `onColorPickerInput`  | Input event handler for the color selector.  | `event: ComponentEvent<string, HTMLInputElement>` |
