### Properties

| Property         | Type                           | Description                                                   |
| ---------------- | ------------------------------ | ------------------------------------------------------------- |
| `data`           | MenuData[]                     | Array of objects representing the menu items.                 |
| `[size='small']` | String                         | Size of the menu, one of `'small'`, `'medium'`, or `'large'`. |
| `[visible]`      | Boolean                        | Whether the menu is visible.                                  |
| `[header]`       | Snippet                        | Custom content for the menu header.                           |
| `[footer]`       | Snippet                        | Custom content for the menu footer.                           |
| `[...attr] `     | HTMLAttributes<HTMLDivElement> | Additional attributes to be expanded on to primary the node.  |

### Callbacks

| Name           | Description                                     | Arguments                       |
| -------------- | ----------------------------------------------- | ------------------------------- |
| `onMenuUpdate` | Callback function triggered on menu update.     | `event: ComponentEvent<string>` |
| `onMenuClick`  | Callback function triggered on menu item click. | `event: ComponentEvent<string>` |
| `onMenuBlur`   | Callback function triggered on menu blur.       | `event: FocusEvent`             |

### Interfaces

#### `MenuData`

| Property        | Type       | Description                                             |
| --------------- | ---------- | ------------------------------------------------------- |
| `id`            | String     | Unique identifier for the menu item.                    |
| `[label]`       | String     | Label text for the menu item.                           |
| `[html]`        | String     | HTML content for the menu item.                         |
| `[icon]`        | IconName   | Name of the icon to display for the menu item.          |
| `[prependIcon]` | boolean    | Put the icon before the label instead of after.         |
| `[meta]`        | String     | Additional information/meta for the menu item.          |
| `[divide]`      | Boolean    | Whether to display a dividing line above the menu item. |
| `[inline]`      | Boolean    | Whether the menu item should be displayed inline.       |
| `[selected]`    | Boolean    | Whether the menu item is selected.                      |
| `[submenu]`     | MenuData[] | Submenu items for nested menus.                         |
