# Rating Component

The `Rating` component allows users to provide a rating by selecting from predefined options.

### Properties

#### `RatingProps`

| Property         | Type                             | Description                                                             |
| ---------------- | -------------------------------- | ----------------------------------------------------------------------- |
| `id`             | `string`                         | The unique identifier for the component.                                |
| `labels`         | `RatingProperties['labels']`     | Array of objects representing rating options with labels and values.    |
| `order`          | `RatingProperties['order']`      | The order in which the labels are displayed.                            |
| `layout`         | `RatingProperties['layout']`     | The layout of the rating component. Options: '1' (default) or 'slider'. |
| `response`       | `RatingValue[]`                  | Array containing the selected rating options.                           |
| `ratingResponse` | `(value: RatingValue[]) => void` | Callback triggered when the rating response is changed.                 |

### Usage

```html
<script lang="ts">
	import { RatingProps } from './path-to-rating-component';

	// Example usage
	let ratingProps: RatingProps = {
		id: 'rating-question-1',
		labels: [
			{ label: 'Poor', value: 1 },
			{ label: 'Fair', value: 2 },
			{ label: 'Average', value: 3 },
			// ... add more labels
		],
		order: 'default',
		layout: '1',
		response: [],
		ratingResponse: (response) => console.log('Rating Response:', response),
	};
</script>

<Rating {...ratingProps} />
```
