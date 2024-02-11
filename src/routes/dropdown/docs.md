### Properties

| Property             | Type              | Description                                             |
| -------------------- | ----------------- | ------------------------------------------------------- |
| `options`            | DropdownOptions[] | Array of objects representing the dropdown options.     |
| `placeholder=null`   | string            | Placeholder text for the dropdown input.                |
| `value=null`         | string            | Selected value from the dropdown options.               |
| `label=null`         | string            | Label for the dropdown.                                 |
| `searchThreshold=15` | number            | Number of options to enable search functionality.       |
| `disabled=false`     | boolean           | Disables the dropdown if `true`.                        |
| `required=false`     | boolean           | Indicates if the dropdown is required.                  |
| `size='small'`       | string            | Size of the dropdown: `'small'`, `'medium'`, `'large'`. |

### Callbacks

| Name       | Description                                | Arguments                       |
| ---------- | ------------------------------------------ | ------------------------------- |
| `onChange` | Triggered when the dropdown value changes. | `value: DropdownOptions['id'] ` |

### Interfaces

#### `DropdownOptions`

| Property   | Type              | Description                                       |
| ---------- | ----------------- | ------------------------------------------------- |
| `label`    | string            | Label for the dropdown option.                    |
| `id`       | string            | Identifier for the dropdown option.               |
| `meta`     | string            | Additional metadata for the dropdown option.      |
| `selected` | boolean           | Indicates if the dropdown option is selected.     |
| `submenu`  | DropdownOptions[] | Array of submenu options for the dropdown option. |
