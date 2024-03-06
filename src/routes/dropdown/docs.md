### Properties

| Property               | Type                           | Description                                                                  |
| ---------------------- | ------------------------------ | ---------------------------------------------------------------------------- |
| `options`              | MenuData[]                     | Array of objects representing the dropdown options.                          |
| `[placeholder]`        | string                         | Placeholder text for the dropdown input.                                     |
| `[value]`              | string                         | Selected value from the dropdown options.                                    |
| `[label]`              | string                         | Label for the dropdown.                                                      |
| `[searchThreshold=20]` | number                         | Number of options to enable search functionality.                            |
| `[disabled]`           | boolean                        | Disables the dropdown if `true`.                                             |
| `[required]`           | boolean                        | Indicates if the dropdown is required.                                       |
| `[size='small']`       | string                         | Size of the dropdown: `'small'`, `'medium'`, `'large'`.                      |
| `[displayIconOnly]`    | boolean                        | When an option with an icon is selected don't show the label, only the icon. |
| `[...attr] `           | HTMLAttributes<HTMLDivElement> | Additional attributes to be expanded on to primary the node.                 |

### Callbacks

| Name               | Description                                | Arguments                               |
| ------------------ | ------------------------------------------ | --------------------------------------- |
| `onDropdownChange` | Triggered when the dropdown value changes. | `event: ComponentEvent<MenuData['id']>` |
