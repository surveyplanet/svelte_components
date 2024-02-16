### Properties

| Property               | Type             | Description                                             |
| ---------------------- | ---------------- | ------------------------------------------------------- |
| `options`              | DropdownOption[] | Array of objects representing the dropdown options.     |
| `[placeholder]`        | string           | Placeholder text for the dropdown input.                |
| `[value]`              | string           | Selected value from the dropdown options.               |
| `[label]`              | string           | Label for the dropdown.                                 |
| `[searchThreshold=20]` | number           | Number of options to enable search functionality.       |
| `[disabled]`           | boolean          | Disables the dropdown if `true`.                        |
| `[required]`           | boolean          | Indicates if the dropdown is required.                  |
| `[size='small']`       | string           | Size of the dropdown: `'small'`, `'medium'`, `'large'`. |

### Callbacks

| Name               | Description                                | Arguments                      |
| ------------------ | ------------------------------------------ | ------------------------------ |
| `onDropdownChange` | Triggered when the dropdown value changes. | `value: DropdownOption['id'] ` |

### Interfaces

#### `DropdownOption`

| Property   | Type             | Description                                       |
| ---------- | ---------------- | ------------------------------------------------- |
| `label`    | string           | Label for the dropdown option.                    |
| `id`       | string           | Identifier for the dropdown option.               |
| `meta`     | string           | Additional metadata for the dropdown option.      |
| `selected` | boolean          | Indicates if the dropdown option is selected.     |
| `submenu`  | DropdownOption[] | Array of submenu options for the dropdown option. |
