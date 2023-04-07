### Properties and Events

| Name   | Type                  | Description                                                                   |
| ------ | --------------------- | ----------------------------------------------------------------------------- |
| data   | `menuData[]`          | Menu data                                                                     |
| update | `CustomEvent<string>` | Dispatched when an item with submenu is clicked and it updates the menu state |
| click  | `CustomEvent<string>` | Dispatched when an item without submenu is clicked                            |

### Types

| Name     | Description                          |
| -------- | ------------------------------------ |
| menuData | Interface for menu item data         |
| IconName | Type for icon names used in the menu |

### menuData

| Property | Type       | Description                             |
| -------- | ---------- | --------------------------------------- |
| id       | string     | The id of the menu item                 |
| label    | string     | The text label of the menu item         |
| html     | string     | The html content of the menu item       |
| icon     | IconName   | The name of the icon used in the menu   |
| meta     | string     | The meta data associated with the item  |
| divide   | boolean    | If true, the item should have a divider |
| inline   | boolean    | If true, the item should be inline      |
| selected | boolean    | If true, the item is currently selected |
| submenu  | menuData[] | An array of submenu items               |

### CSS classes

| Class                       | Description                          |
| --------------------------- | ------------------------------------ |
| `.sp-menu`                  | The root menu element                |
| `.sp-menu--item`            | A menu item element                  |
| `.sp-menu--item--divide`    | A menu item with a divider element   |
| `.sp-menu--item--inline`    | A menu item with an inline element   |
| `.sp-menu--item--selected`  | A selected menu item                 |
| `.sp-menu--item--submenu`   | A menu item with a submenu           |
| `.sp-menu--back-btn`        | The back button element              |
| `.sp-menu--back-btn--label` | The label of the back button element |
