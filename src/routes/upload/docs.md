#### Properties

#### `UploadProps`

| Property  | Type       | Description                                             | Default    |
| --------- | ---------- | ------------------------------------------------------- | ---------- |
| `label`   | `string`   | The label or text associated with the upload button.    | `'Upload'` |
| `formats` | `string[]` | Array of allowed file formats (e.g., `['jpg', 'png']`). |            |
| `maxSize` | `number`   | The maximum allowed file size in megabytes (MB).        | `10`       |

#### Callbacks

| Name       | Description                                 | Arguments          |
| ---------- | ------------------------------------------- | ------------------ |
| `onChange` | Callback triggered when a file is selected. | `data: UploadData` |

##### Interfaces

| Name       | Description                                  | Type                                                 |
| ---------- | -------------------------------------------- | ---------------------------------------------------- |
| UploadData | The data returned from the `onChange` event. | `{image: File; data: string \| ArrayBuffer \| null}` |
