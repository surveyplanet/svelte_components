### Properties

| Property         | Type       | Description                                           |
| ---------------- | ---------- | ----------------------------------------------------- |
| `action`         | boolean    | Makes the button a floating action button (FAB).      |
| `block`          | boolean    | Makes the button full width if `true`.                |
| `children`       | Snippet    | Optional content to be displayed inside the button.   |
| `disabled`       | boolean    | Disables the button if `true`.                        |
| `form`           | string     | Form ID associated with the button.                   |
| `loader`         | boolean    | Shows a loader if `true`.                             |
| `mode='primary'` | ButtonMode | Button mode, one of the `BUTTON_MODES`.               |
| `round`          | boolean    | Makes the button round if `true`.                     |
| `size='medium'`  | string     | Size of the button: `'small'`, `'medium'`, `'large'`. |
| `type='button`   | string     | Button type: `'button'`, `'submit'`, `'reset'`.       |

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
