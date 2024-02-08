#### Properties

#### `SortListProps`

| Property | Type             | Description                      | Default |
| -------- | ---------------- | -------------------------------- | ------- |
| `data`   | `SortListData[]` | The array of items to be sorted. |         |

#### Callbacks

| Name     | Description                          | Arguments              |
| -------- | ------------------------------------ | ---------------------- |
| `onSort` | Event handler for list item sorting. | `data: SortListData[]` |

#### Interfaces

#### `SortListData`

| Property | Type       | Description                                |
| -------- | ---------- | ------------------------------------------ |
| `label`  | `string`   | The label or text content for the item.    |
| `meta`   | `string`   | Additional meta information for the item.  |
| `image`  | `string`   | URL of an image associated with the item.  |
| `icon`   | `IconName` | Name of the icon associated with the item. |
