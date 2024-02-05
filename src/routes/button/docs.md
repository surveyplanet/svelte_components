# Button component

### Properties

| Property                    | Type       | Description                                           |
| --------------------------- | ---------- | ----------------------------------------------------- |
| `mode=BUTTON_MODES.primary` | ButtonMode | Button mode, one of the `BUTTON_MODES`.               |
| `disabled=false`            | boolean    | Disables the button if `true`.                        |
| `loader`                    | boolean    | Shows a loader if `true`.                             |
| `round`                     | boolean    | Makes the button round if `true`.                     |
| `block`                     | boolean    | Makes the button full width if `true`.                |
| `action`                    | boolean    | Indicates an action button if `true`.                 |
| `type`                      | string     | Button type: `'button'`, `'submit'`, `'reset'`.       |
| `form`                      | string     | Form ID associated with the button.                   |
| `size`                      | string     | Size of the button: `'small'`, `'medium'`, `'large'`. |
| `children`                  | Snippet    | Optional content to be displayed inside the button.   |

### Callbacks

| Name      | Description                         | Arguments    |
| --------- | ----------------------------------- | ------------ |
| `onClick` | Click event handler for the button. | `MouseEvent` |

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
