### Properties

| Property     | Type                        | Description                                                  |
| ------------ | --------------------------- | ------------------------------------------------------------ |
| `data`       | BreadcrumbData[]            | Array of objects representing breadcrumbs.                   |
| `[...attr] ` | HTMLAttributes<HTMLElement> | Additional attributes to be expanded on to primary the node. |

### Interfaces

#### `BreadcrumbData`

| Property | Type   | Description                           |
| -------- | ------ | ------------------------------------- |
| `name`   | string | Name of the breadcrumb item.          |
| `[url]`  | string | Optional URL for the breadcrumb item. |
