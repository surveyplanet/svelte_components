# Dropdown component

### Interfaces

#### `DropdownOptions`

| Property   | Type              | Description                                       |
| ---------- | ----------------- | ------------------------------------------------- |
| `label`    | String            | Label for the dropdown option.                    |
| `id`       | String            | Identifier for the dropdown option.               |
| `meta`     | String            | Additional metadata for the dropdown option.      |
| `selected` | Boolean           | Indicates if the dropdown option is selected.     |
| `submenu`  | DropdownOptions[] | Array of submenu options for the dropdown option. |

### Properties

| Property          | Type              | Description                                             |
| ----------------- | ----------------- | ------------------------------------------------------- |
| `options`         | DropdownOptions[] | Array of objects representing the dropdown options.     |
| `placeholder`     | String            | Placeholder text for the dropdown input.                |
| `value`           | String            | Selected value from the dropdown options.               |
| `label`           | String            | Label for the dropdown.                                 |
| `searchThreshold` | Number            | Number of options to enable search functionality.       |
| `disabled`        | Boolean           | Disables the dropdown if `true`.                        |
| `required`        | Boolean           | Indicates if the dropdown is required.                  |
| `size`            | String            | Size of the dropdown: `'small'`, `'medium'`, `'large'`. |
| `onChange`        | Function          | Change event handler for the dropdown.                  |

### Callbacks

| Name       | Description                                | Type                                      |
| ---------- | ------------------------------------------ | ----------------------------------------- |
| `onChange` | Triggered when the dropdown value changes. | `(value: DropdownOptions['id']) => void ` |
