### Properties

| Property        | Type                        | Description                                         |
| --------------- | --------------------------- | --------------------------------------------------- |
| `data`          | NavBarData[]                | Array of data for individual navigation items.      |
| `[navMenuData]` | MenuData[]                  | Array of data for the navigation menu (optional).   |
| `[vertical]`    | boolean                     | Indicates if the NavBar is in vertical orientation. |
| `[...attr] `    | HTMLAttributes<HTMLElement> | Additional attributes to be expanded on to primary the node.       |

### Callbacks

| Name         | Description                                         | Arguments                       |
| ------------ | --------------------------------------------------- | ------------------------------- |
| `onNavClick` | Event handler for individual navigation item click. | `event: ComponentEvent<string>` |

### Interfaces

#### `NavBarData`

| Property | Type       | Description                                |
| -------- | ---------- | ------------------------------------------ |
| `icon`   | `IconName` | Name of the icon to be displayed.          |
| `[link]` | `string`   | URL link for the navigation item.          |
| `title`  | `string`   | Title of the navigation item.              |
| `id`     | `string`   | Unique identifier for the navigation item. |
