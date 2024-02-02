# Button component

### Constants

#### `BUTTON_MODES`

The button modes include:

-   `primary`
-   `light`
-   `accent`
-   `accent_alt_1`
-   `accent_alt_2`
-   `accent_alt_3`
-   `outline`

### Properties

| Property   | Type    | Description                                           |
| ---------- | ------- | ----------------------------------------------------- |
| `mode`     | String  | Button mode, one of the `BUTTON_MODES`.               |
| `disabled` | Boolean | Disables the button if `true`.                        |
| `loader`   | Boolean | Shows a loader if `true`.                             |
| `round`    | Boolean | Makes the button round if `true`.                     |
| `block`    | Boolean | Makes the button full width if `true`.                |
| `action`   | Boolean | Indicates an action button if `true`.                 |
| `type`     | String  | Button type: `'button'`, `'submit'`, `'reset'`.       |
| `form`     | String  | Form ID associated with the button.                   |
| `size`     | String  | Size of the button: `'small'`, `'medium'`, `'large'`. |
| `children` | Snippet | Optional content to be displayed inside the button.   |

### Callbacks

| Name      | Description                         | Type                      |
| --------- | ----------------------------------- | ------------------------- |
| `onClick` | Click event handler for the button. | `(e: MouseEvent) => void` |
