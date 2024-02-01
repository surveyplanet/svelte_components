# Image Component

The `Image` component allows users to select images from a list of choices.

### Properties

#### `ImageProps`

| Property          | Type                              | Description                                                              |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------ |
| `id`              | `string`                          | The unique identifier for the component.                                 |
| `labels`          | `ImageProperties['labels']`       | An array of objects representing image choices.                          |
| `multi`           | `ImageProperties['multi']`        | If set to `true`, allows selecting multiple images; otherwise, only one. |
| `size`            | `ImageProperties['size']`         | The size of the images (`'small'`, `'medium'`, `'large'`).               |
| `hideCaptions`    | `ImageProperties['hideCaptions']` | If set to `true`, hides captions for images.                             |
| `random`          | `ImageProperties['random']`       | If set to `true`, the order of images will be randomized.                |
| `contain`         | `ImageProperties['contain']`      | If set to `true`, contains the entire image within the specified size.   |
| `response`        | `ImageValue[]`                    | Array of image values containing label-value pairs.                      |
| `onImageResponse` | `(value: ImageValue[]) => void`   | Callback triggered when the image response is changed.                   |

### Usage

```html
<script lang="ts">
	import { ImageProps } from './path-to-image-component';

	// Example usage
	let imageProps: ImageProps = {
		id: 'image-question-1',
		labels: [
			{ label: 'Image 1', image: 'image1.jpg' },
			{ label: 'Image 2', image: 'image2.jpg' },
			// Add more images as needed
		],
		multi: true,
		size: 'medium',
		hideCaptions: false,
		random: false,
		contain: false,
		response: [],
		onImageResponse: (response) => console.log('Image Response:', response),
	};
</script>

<image {...imageProps} />
```
