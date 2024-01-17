### Properties and Events

| Name     | Type                  | Description                                                                   |
| -------- | --------------------- | ----------------------------------------------------------------------------- |
| `data`   | `MenuData[]`          | Menu data                                                                     |
| `update` | `CustomEvent<string>` | Dispatched when an item with submenu is clicked and it updates the menu state |
| `click`  | `CustomEvent<string>` | Dispatched when an item without submenu is clicked                            |

### Types

| Name       | Description                          |
| ---------- | ------------------------------------ |
| `MenuData` | Interface for menu item data         |
| `IconName` | Type for icon names used in the menu |

### MenuData

| Property   | Type         | Description                             |
| ---------- | ------------ | --------------------------------------- |
| `id`       | `string`     | The id of the menu item                 |
| `label`    | `string`     | The text label of the menu item         |
| `html`     | `string`     | The html content of the menu item       |
| `icon`     | `IconName`   | The name of the icon used in the menu   |
| `meta`     | `string`     | The meta data associated with the item  |
| `divide`   | `boolean`    | If true, the item should have a divider |
| `inline`   | `boolean`    | If true, the item should be inline      |
| `selected` | `boolean`    | If true, the item is currently selected |
| `submenu`  | `MenuData[]` | An array of submenu items               |

### Slots

| Name     | description                                            |
| -------- | ------------------------------------------------------ |
| `header` | Additional content to prepend to the top of the menu   |
| `footer` | Additional content to append to the bottom of the menu |
