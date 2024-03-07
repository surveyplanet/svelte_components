### Properties

### `UploadProps`

| Property                                                     | Type                            | Description                                                  |
| ------------------------------------------------------------ | ------------------------------- | ------------------------------------------------------------ |
| `[id]`                                                       | string                          | The unique identifier for the upload component.              |
| `[label]`                                                    | string                          | The label or text associated with the upload button.         |
| `[formats={['apng', 'avif', 'gif', 'jpeg', 'png', 'webp']]}` | string[]                        | Array of allowed file formats (event.g., `['jpg', 'png']`).  |
| `[maxSize={10}]`                                             | number                          | The maximum allowed file size in megabytes (MB).             |
| `[note]`                                                     | string                          | Additional information or instructions for the user.         |
| `[preview]`                                                  | boolean                         | Whether to display a preview of the selected image.          |
| `[...attr] `                                                 | HTMLAttributes<HTMLFormElement> | Additional attributes to be expanded on to primary the node. |

### Callbacks

| Name               | Description                                 | Arguments                           |
| ------------------ | ------------------------------------------- | ----------------------------------- |
| `onUploadComplete` | Callback triggered when a file is selected. | `event: ComponentEvent<UploadData>` |
| `onUploadError`    | Callback triggered when an error occurs.    | `event: ComponentEvent`             |

### Interfaces

| Name       | Description                                  | Type                                                 |
| ---------- | -------------------------------------------- | ---------------------------------------------------- |
| UploadData | The data returned from the `onChange` event. | `{image: File; data: string \| ArrayBuffer \| null}` |
