# Upload Component

The `Upload` component allows users to upload an image with specified formats and maximum size.

### Properties

#### `UploadProps`

| Property   | Type                                                                   | Description                                             |
| ---------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| `label`    | `string`                                                               | The label or text associated with the upload button.    |
| `formats`  | `string[]`                                                             | Array of allowed file formats (e.g., `['jpg', 'png']`). |
| `maxSize`  | `number`                                                               | The maximum allowed file size in megabytes (MB).        |
| `onchange` | `(data: { image: File; data: string \| ArrayBuffer \| null }) => void` | Callback triggered when a file is selected.             |

### Usage

```html
<script lang="ts">
	import { UploadProps } from './path-to-upload-component';

	// Example usage
	let uploadProps: UploadProps = {
		label: 'Upload Image',
		formats: ['jpg', 'png'],
		maxSize: 10,
		onchange: ({ image, data }) =>
			console.log('File uploaded:', image, 'Data:', data),
	};
</script>

<Upload {...uploadProps} />
```
