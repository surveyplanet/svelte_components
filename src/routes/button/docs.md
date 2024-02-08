#### Properties

| Property                    | Type       | Description                                           | Default                |
| --------------------------- | ---------- | ----------------------------------------------------- | ---------------------- |
| `mode=BUTTON_MODES.primary` | ButtonMode | Button mode, one of the `BUTTON_MODES`.               | `BUTTON_MODES.primary` |
| `disabled=false`            | boolean    | Disables the button if `true`.                        | `false`                |
| `loader`                    | boolean    | Shows a loader if `true`.                             | `false`                |
| `round`                     | boolean    | Makes the button round if `true`.                     | `true`                 |
| `block`                     | boolean    | Makes the button full width if `true`.                | `false`                |
| `action`                    | boolean    | Indicates an action button if `true`.                 | `false`                |
| `type`                      | string     | Button type: `'button'`, `'submit'`, `'reset'`.       | `'button'`             |
| `form`                      | string     | Form ID associated with the button.                   | `null`                 |
| `size`                      | string     | Size of the button: `'small'`, `'medium'`, `'large'`. | `'medium'`             |
| `children`                  | Snippet    | Optional content to be displayed inside the button.   |                        |

#### Callbacks

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
