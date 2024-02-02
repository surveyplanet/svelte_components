![Image](https://user-images.githubusercontent.com/747587/209881571-b27372dd-7ae9-4702-ab34-a4ebb8fd2314.png)

# TabBar Component

The `TabBar` component displays a horizontal navigation bar with tabs. It allows the user to switch between different tabs.

### Properties

#### `TabBarData`

| Property   | Type       | Description                            |
| ---------- | ---------- | -------------------------------------- |
| `id`       | `string`   | The unique identifier for the tab.     |
| `label`    | `string`   | The label or title for the tab.        |
| `html`     | `string`   | The HTML content for the tab.          |
| `icon`     | `IconName` | The icon to be displayed on the tab.   |
| `selected` | `boolean`  | Indicates whether the tab is selected. |
| `disabled` | `boolean`  | Indicates whether the tab is disabled. |

#### `TabBarProps`

| Property | Type           | Description                                                    |
| -------- | -------------- | -------------------------------------------------------------- |
| `id`     | `string`       | The unique identifier for the tab bar.                         |
| `grow`   | `boolean`      | If `true`, allows the tab bar to grow to fill available space. |
| `data`   | `TabBarData[]` | An array of `TabBarData` objects representing each tab.        |

### Callbacks

| Name         | Description                         | Type                   |
| ------------ | ----------------------------------- | ---------------------- |
| `onTabClick` | Event handler for tab button click. | `(id: string) => void` |
