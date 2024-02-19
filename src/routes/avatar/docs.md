### Properties

| Property         | Type                              | Description                                           |
| ---------------- | --------------------------------- | ----------------------------------------------------- |
| `profileImage`   | string                            | URL or key representing the profile image.            |
| `[id]`           | string                            | Optional identifier for additional customization.     |
| `[size='small']` | string                            | Size of the avatar: `'small'`, `'medium'`, `'large'`. |
| `[disabled]`     | boolean                           | Disable the avatar interaction if `true`.             |
| `[...attr] `     | HTMLAttributes<HTMLButtonElement> | Other attributes to be spread on the element.         |

### Callbacks

| Name            | Description                           | Argument                           |
| --------------- | ------------------------------------- | ---------------------------------- |
| `onAvatarClick` | Triggered when the avatar is clicked. | `event: ComponentEvent<undefined>` |
