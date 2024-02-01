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

| Property | Type                             | Description                          |
| -------- | -------------------------------- | ------------------------------------ |
| `data`   | `SortListData[]`                 | The array of items to be sorted.     |
| `sort`   | `(data: SortListData[]) => void` | Callback function to handle sorting. |

### Usage

```html
<script lang="ts">
	import { SortListProps } from './path-to-sortlist-component';

	// Example usage
	let sortListProps: SortListProps = {
		data: [
			{ label: 'Item 1', meta: 'Meta 1', image: 'url1', icon: 'icon1' },
			// ... other items
		],
		sort: (sortedData) => console.log('Sorted Data:', sortedData),
	};
</script>

<SortList {...sortListProps} />
```
