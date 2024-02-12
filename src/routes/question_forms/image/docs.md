### Properties

### `ImageProps`

| Property          | Type                              | Description                                                              | Default |
| ----------------- | --------------------------------- | ------------------------------------------------------------------------ | ------- |
| `id`              | `string`                          | The unique identifier for the component.                                 |         |
| `labels`          | `ImageProperties['labels']`       | An array of objects representing image choices.                          |         |
| `multi`           | `ImageProperties['multi']`        | If set to `true`, allows selecting multiple images; otherwise, only one. |         |
| `size`            | `ImageProperties['size']`         | The size of the images (`'small'`, `'medium'`, `'large'`).               |         |
| `hideCaptions`    | `ImageProperties['hideCaptions']` | If set to `true`, hides captions for images.                             |         |
| `random`          | `ImageProperties['random']`       | If set to `true`, the order of images will be randomized.                |         |
| `contain={false}` | `ImageProperties['contain']`      | If set to `true`, contains the entire image within the specified size.   |
| `response={[]}`   | `ImageValue[]`                    | Array of image values containing label-value pairs.                      |

### Callbacks

| Name              | Description                                            | Type                     |
| ----------------- | ------------------------------------------------------ | ------------------------ |
| `onImageResponse` | Callback triggered when the image response is changed. | `response: ImageValue[]` |
