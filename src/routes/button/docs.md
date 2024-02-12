### Properties

| Property                    | Type       | Description                                           |
| --------------------------- | ---------- | ----------------------------------------------------- |
| `action={false}`            | boolean    | Makes the button a floating action button (FAB).      |
| `block={false}`             | boolean    | Makes the button full width if `true`.                |
| `children`                  | Snippet    | Optional content to be displayed inside the button.   |
| `disabled={false}`          | boolean    | Disables the button if `true`.                        |
| `form`                      | string     | Form ID associated with the button.                   |
| `loader={false}`            | boolean    | Shows a loader if `true`.                             |
| `mode=BUTTON_MODES.primary` | ButtonMode | Button mode, one of the `BUTTON_MODES`.               |
| `round={true}`              | boolean    | Makes the button round if `true`.                     |
| `size='medium'`             | string     | Size of the button: `'small'`, `'medium'`, `'large'`. |
| `type='button`              | string     | Button type: `'button'`, `'submit'`, `'reset'`.       |

### Callbacks

| Name            | Description                         | Arguments    |
| --------------- | ----------------------------------- | ------------ |
| `onButtonClick` | Click event handler for the button. | `MouseEvent` |

### Types

#### `ButtonMode`

The button modes include:

-   `primary`
-   `light`
-   `accent`
-   `accent_alt_1`
-   `accent_alt_2`
-   `accent_alt_3`
-   `outline`
