# Chips component

### Interfaces

#### `ChipData`

| Property   | Type    | Description                        |
| ---------- | ------- | ---------------------------------- |
| `id`       | String  | Identifier for the chip.           |
| `label`    | String  | Label text for the chip.           |
| `selected` | Boolean | Indicates if the chip is selected. |

### Properties

| Property      | Type       | Description                               |
| ------------- | ---------- | ----------------------------------------- |
| `data`        | ChipData[] | Array of objects representing the chips.  |
| `selectable`  | Boolean    | Enables chip selection if `true`.         |
| `multiSelect` | Boolean    | Allows multiple chip selection if `true`. |
| `removable`   | Boolean    | Enables chip removal if `true`.           |
| `onclick`     | Function   | Click event handler for the chips.        |
| `onremove`    | Function   | Remove event handler for the chips.       |

### Methods

#### `getChipId(chipEl: HTMLButtonElement): string`

Returns the ID of the chip based on the HTML element.

#### `removeHandler(id: string): void`

Removes the chip with the specified ID.

#### `toggle(id: string): void`

Toggles the selection state of the chip with the specified ID.

### Events

| Name       | Description                       |
| ---------- | --------------------------------- |
| `onclick`  | Triggered when a chip is clicked. |
| `onremove` | Triggered when a chip is removed. |
