# Modal component

### Interface

#### `ModalProps`

| Property                | Type    | Description                                                    |
| ----------------------- | ------- | -------------------------------------------------------------- |
| `title`                 | String  | Title text for the modal.                                      |
| `subtitle`              | String  | Subtitle text for the modal.                                   |
| `fullscreen`            | Boolean | Indicates if the modal should be displayed in fullscreen.      |
| `overlay`               | Boolean | Indicates whether to display an overlay behind the modal.      |
| `visible`               | Boolean | Indicates whether the modal is currently visible.              |
| `animationMilliseconds` | Number  | Duration of the intro/outro animation in milliseconds.         |
| `size='medium'`         | String  | Size of the modal, one of `'small'`, `'medium'`, or `'large'`. |
| `footer`                | Snippet | Custom content for the modal footer.                           |
| `body`                  | Snippet | Custom content for the modal body.                             |
| `header`                | Snippet | Custom content for the modal header.                           |

### Callbacks

| Name           | Description                                         | Type                       |
| -------------- | --------------------------------------------------- | -------------------------- |
| `onIntroStart` | Event handler for the start of the intro animation. | `(e: CustomEvent) => void` |
| `onIntroEnd`   | Event handler for the end of the intro animation.   | `(e: CustomEvent) => void` |
| `onOutroStart` | Event handler for the start of the outro animation. | `(e: CustomEvent) => void` |
| `onOutroEnd`   | Event handler for the end of the outro animation.   | `(e: CustomEvent) => void` |
