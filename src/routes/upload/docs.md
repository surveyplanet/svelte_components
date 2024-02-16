### Properties

### `UploadProps`

| Property                                                     | Type       | Description                                                 |
| ------------------------------------------------------------ | ---------- | ----------------------------------------------------------- |
| `[label]`                                                    | `string`   | The label or text associated with the upload button.        |
| `[formats={['apng', 'avif', 'gif', 'jpeg', 'png', 'webp']]}` | `string[]` | Array of allowed file formats (event.g., `['jpg', 'png']`). |
| `[maxSize={10}]`                                             | `number`   | The maximum allowed file size in megabytes (MB).            |

### Callbacks

| Name             | Description                                 | Arguments                           |
| ---------------- | ------------------------------------------- | ----------------------------------- |
| `onUploadUpload` | Callback triggered when a file is selected. | `event: ComponentEvent<UploadData>` |

### Interfaces

| Name       | Description                                  | Type                                                 |
| ---------- | -------------------------------------------- | ---------------------------------------------------- |
| UploadData | The data returned from the `onChange` event. | `{image: File; data: string \| ArrayBuffer \| null}` |
