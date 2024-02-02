# Upload Component

The `Upload` component allows users to upload an image with specified formats and maximum size.

### Properties

#### `UploadProps`

| Property   | Type                                                                   | Description                                             |
| ---------- | ---------------------------------------------------------------------- | ------------------------------------------------------- |
| `label`    | `string`                                                               | The label or text associated with the upload button.    |
| `formats`  | `string[]`                                                             | Array of allowed file formats (e.g., `['jpg', 'png']`). |
| `maxSize`  | `number`                                                               | The maximum allowed file size in megabytes (MB).        |
| `onChange` | `(data: { image: File; data: string \| ArrayBuffer \| null }) => void` | Callback triggered when a file is selected.             |

### Callbacks

| Name       | Description                                 | Type                                                                 |
| ---------- | ------------------------------------------- | -------------------------------------------------------------------- |
| `onChange` | Callback triggered when a file is selected. | `(data: {image: File;data: string \| ArrayBuffer \| null} ) => void` |
