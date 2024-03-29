### Properties

| Property                                         | Type           | Description                                                                                        |
| ------------------------------------------------ | -------------- | -------------------------------------------------------------------------------------------------- |
| `id={(Date.now() + Math.random()).toString(36)}` | `string`       | The unique identifier for the tab bar.                                                             |
| `block={false}`                                  | `boolean`      | If `true`, allows the tab bar to become a block level element and expands to fill available space. |
| `data`                                           | `TabBarData[]` | An array of `TabBarData` objects representing each tab.                                            |

### Callbacks

| Name         | Description                         | Arguments    |
| ------------ | ----------------------------------- | ------------ |
| `onTabClick` | Event handler for tab button click. | `id: string` |

### Interfaces

### `TabBarData`

| Property   | Type       | Description                            |
| ---------- | ---------- | -------------------------------------- |
| `id`       | `string`   | The unique identifier for the tab.     |
| `label`    | `string`   | The label or title for the tab.        |
| `html`     | `string`   | The HTML content for the tab.          |
| `icon`     | `IconName` | The icon to be displayed on the tab.   |
| `selected` | `boolean`  | Indicates whether the tab is selected. |
| `disabled` | `boolean`  | Indicates whether the tab is disabled. |
