### Interfaces

### `ModalProps`

| Property                        | Type                           | Description                                                    |
| ------------------------------- | ------------------------------ | -------------------------------------------------------------- |
| `[title]`                       | String                         | Title text for the modal.                                      |
| `[subtitle]`                    | String                         | Subtitle text for the modal.                                   |
| `[fullscreen]`                  | Boolean                        | Indicates if the modal should be displayed in fullscreen.      |
| `[overlay]`                     | Boolean                        | Indicates whether to display an overlay behind the modal.      |
| `[visible]`                     | Boolean                        | Indicates whether the modal is currently visible.              |
| `[animationMilliseconds={350]}` | Number                         | Duration of the intro/outro animation in milliseconds.         |
| `[size='medium']`               | String                         | Size of the modal, one of `'small'`, `'medium'`, or `'large'`. |
| `[footer]`                      | Snippet                        | Custom content for the modal footer.                           |
| `[body]`                        | Snippet                        | Custom content for the modal body.                             |
| `[header]`                      | Snippet                        | Custom content for the modal header.                           |
| `[...attr] `                    | HTMLAttributes<HTMLDivElement> | Additional attributes to be expanded on to primary the node.                  |

### Callbacks

| Name                | Description                                         | Arguments            |
| ------------------- | --------------------------------------------------- | -------------------- |
| `onModalIntroStart` | Event handler for the start of the intro animation. | `event: CustomEvent` |
| `onModalIntroEnd`   | Event handler for the end of the intro animation.   | `event: CustomEvent` |
| `onModalOutroStart` | Event handler for the start of the outro animation. | `event: CustomEvent` |
| `onModalOutroEnd`   | Event handler for the end of the outro animation.   | `event: CustomEvent` |
