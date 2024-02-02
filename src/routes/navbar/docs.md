# NavBar component

### Interfaces

#### `NavBarData`

| Property | Type       | Description                                |
| -------- | ---------- | ------------------------------------------ |
| `icon`   | `IconName` | Name of the icon to be displayed.          |
| `link`   | `string`   | URL link for the navigation item.          |
| `title`  | `string`   | Title of the navigation item.              |
| `id`     | `string`   | Unique identifier for the navigation item. |

#### `NavBarProps`

| Property      | Type                        | Description                                         |
| ------------- | --------------------------- | --------------------------------------------------- |
| `data`        | `NavBarData[]`              | Array of data for individual navigation items.      |
| `navMenuData` | `MenuData[]`                | Array of data for the navigation menu (optional).   |
| `vertical`    | `boolean`                   | Indicates if the NavBar is in vertical orientation. |
| `onnavlink`   | `(navLink: string) => void` | Event handler for navigation link click.            |

### Callbacks

| Name       | Description                                          | Type                   |
| ---------- | ---------------------------------------------------- | ---------------------- |
| `onClick`  | Event handler for individual navigation item click.  | `(id: string) => void` |
| `onUpdate` | Event handler for individual navigation item update. | `(id: string) => void` |
