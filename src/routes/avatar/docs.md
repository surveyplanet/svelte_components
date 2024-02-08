#### Properties

| Property       | Type    | Description                                           | Default |
| -------------- | ------- | ----------------------------------------------------- | ------- |
| `profileImage` | String  | URL or key representing the profile image.            |         |
| `id`           | String  | Optional identifier for additional customization.     |         |
| `size`         | String  | Size of the avatar: `'small'`, `'medium'`, `'large'`. |         |
| `disabled`     | Boolean | Disable the avatar interaction if `true`.             |         |

#### Callbacks

| Name      | Description                           | Argument        |
| --------- | ------------------------------------- | --------------- |
| `onClick` | Triggered when the avatar is clicked. | `e: MouseEvent` |

### Mascots

The following mascots are available for the `profileImage` property:

-   `cubbi`
-   `gruffi`
-   `sunni`
-   `tummi`
-   `zummi`

### Background Colors

The avatar can have one of the following background colors:

-   `yellow`
-   `blue`
-   `pink`
-   `green`
