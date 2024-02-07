#### Properties

| Property          | Type              | Description                                             | Default   |
| ----------------- | ----------------- | ------------------------------------------------------- | --------- |
| `options`         | DropdownOptions[] | Array of objects representing the dropdown options.     |           |
| `placeholder`     | String            | Placeholder text for the dropdown input.                | `null`    |
| `value`           | String            | Selected value from the dropdown options.               | `null`    |
| `label`           | String            | Label for the dropdown.                                 | `null`    |
| `searchThreshold` | Number            | Number of options to enable search functionality.       | `15`      |
| `disabled`        | Boolean           | Disables the dropdown if `true`.                        | `false`   |
| `required`        | Boolean           | Indicates if the dropdown is required.                  | `false`   |
| `size`            | String            | Size of the dropdown: `'small'`, `'medium'`, `'large'`. | `'small'` |

#### Callbacks

| Name       | Description                                | Arguments                       |
| ---------- | ------------------------------------------ | ------------------------------- |
| `onChange` | Triggered when the dropdown value changes. | `value: DropdownOptions['id'] ` |

#### Interfaces

#### `DropdownOptions`

| Property   | Type              | Description                                       |
| ---------- | ----------------- | ------------------------------------------------- |
| `label`    | String            | Label for the dropdown option.                    |
| `id`       | String            | Identifier for the dropdown option.               |
| `meta`     | String            | Additional metadata for the dropdown option.      |
| `selected` | Boolean           | Indicates if the dropdown option is selected.     |
| `submenu`  | DropdownOptions[] | Array of submenu options for the dropdown option. |
