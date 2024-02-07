# Modal component

##### Interfaces

#### `ModalProps`

| Property                | Type    | Description                                                    | Default      |
| ----------------------- | ------- | -------------------------------------------------------------- | ------------ |
| `title`                 | String  | Title text for the modal.                                      | `'Modal'`    |
| `subtitle`              | String  | Subtitle text for the modal.                                   | `'Subtitle'` |
| `fullscreen`            | Boolean | Indicates if the modal should be displayed in fullscreen.      | `false`      |
| `overlay`               | Boolean | Indicates whether to display an overlay behind the modal.      | `true`       |
| `visible`               | Boolean | Indicates whether the modal is currently visible.              | `false`      |
| `animationMilliseconds` | Number  | Duration of the intro/outro animation in milliseconds.         | `350`        |
| `size`                  | String  | Size of the modal, one of `'small'`, `'medium'`, or `'large'`. | `'medium'`   |
| `footer`                | Snippet | Custom content for the modal footer.                           |
| `body`                  | Snippet | Custom content for the modal body.                             |
| `header`                | Snippet | Custom content for the modal header.                           |

#### Callbacks

| Name           | Description                                         | Type             |
| -------------- | --------------------------------------------------- | ---------------- |
| `onIntroStart` | Event handler for the start of the intro animation. | `e: CustomEvent` |
| `onIntroEnd`   | Event handler for the end of the intro animation.   | `e: CustomEvent` |
| `onOutroStart` | Event handler for the start of the outro animation. | `e: CustomEvent` |
| `onOutroEnd`   | Event handler for the end of the outro animation.   | `e: CustomEvent` |
