# Avatar component

### Properties

| Property       | Type     | Description                                           |
| -------------- | -------- | ----------------------------------------------------- |
| `profileImage` | String   | URL or key representing the profile image.            |
| `id`           | String   | Optional identifier for additional customization.     |
| `size`         | String   | Size of the avatar: `'small'`, `'medium'`, `'large'`. |
| `disabled`     | Boolean  | Disable the avatar interaction if `true`.             |
| `onclick`      | Function | Click event handler for the avatar.                   |

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

### Methods

#### `getPersistentIndex(length: number): number`

Generates a persistent index based on the `id` property.

### Events

| Name      | Description                           |
| --------- | ------------------------------------- |
| `onclick` | Triggered when the avatar is clicked. |
