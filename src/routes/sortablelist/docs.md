# SortList Component

The `SortList` component allows users to interactively sort a list of items through drag-and-drop functionality.

### Properties

#### `SortListData`

| Property | Type       | Description                                |
| -------- | ---------- | ------------------------------------------ |
| `label`  | `string`   | The label or text content for the item.    |
| `meta`   | `string`   | Additional meta information for the item.  |
| `image`  | `string`   | URL of an image associated with the item.  |
| `icon`   | `IconName` | Name of the icon associated with the item. |

#### `CustomDragEventTarget`

A type that extends `HTMLElement` to include specific properties for handling drag events.

#### `SortListProps`

| Property | Type             | Description                      |
| -------- | ---------------- | -------------------------------- |
| `data`   | `SortListData[]` | The array of items to be sorted. |

### Callbacks

| Name     | Description                          | Type                             |
| -------- | ------------------------------------ | -------------------------------- |
| `onSort` | Event handler for list item sorting. | `(data: SortListData[]) => void` |
