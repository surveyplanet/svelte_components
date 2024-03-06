### Properties

| Property         | Type                              | Description                                                                                                |
| ---------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `profileImage`   | string                            | URL or key representing the profile image.                                                                 |
| `[userId]`       | string                            | Optional identifier which keeps the default mascot and background consistent between sessions.             |
| `[size='small']` | string                            | Size of the avatar: `'small'`, `'medium'`, `'large'`.                                                      |
| `[disabled]`     | boolean                           | Disable the avatar interaction, if `true` avatar is rendered in a `<div>` element instead of a `<button>`. |
| `[...attr] `     | HTMLAttributes<HTMLButtonElement> | Additional attributes to be expanded on to primary the node.                                               |

### Callbacks

| Name            | Description                           | Argument                           |
| --------------- | ------------------------------------- | ---------------------------------- |
| `onAvatarClick` | Triggered when the avatar is clicked. | `event: ComponentEvent<undefined>` |
