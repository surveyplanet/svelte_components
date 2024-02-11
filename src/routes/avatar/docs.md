### Properties

| Property       | Type    | Description                                           |
| -------------- | ------- | ----------------------------------------------------- |
| `profileImage` | string  | URL or key representing the profile image.            |
| `id`           | string  | Optional identifier for additional customization.     |
| `size`         | string  | Size of the avatar: `'small'`, `'medium'`, `'large'`. |
| `disabled`     | boolean | Disable the avatar interaction if `true`.             |

### Callbacks

| Name      | Description                           | Argument        |
| --------- | ------------------------------------- | --------------- |
| `onClick` | Triggered when the avatar is clicked. | `e: MouseEvent` |
