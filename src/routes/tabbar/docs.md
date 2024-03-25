### Properties

| Property                  | Type                            | Description                                                                                                                                  |
| ------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `data`                    | TabBarData[]                    | An array of `TabBarData` objects representing each tab.                                                                                      |
| `[block]`                 | boolean                         | If `true`, allows the tab bar to become a block level element and expands to fill available space.                                           |
| `[plain]`                 | boolean                         | Dressed down style with no selection indicator.                                                                                              |
| `[defaultIndicatorWidth]` | number                          | Set the initial width of the selection indicator manually to prevent it from jumping from 0 (the width set by css) to it's calculated width. |
| `[defaultIndicatorX]`     | number                          | Set the initial x position of the selection indicator manually to prevent it from jumping from 0 to it's calculated position.                |
| `[...attr] `              | HTMLAttributes<HTMLFormElement> | Additional attributes to be expanded on to primary the node.                                                                                 |

### Callbacks

| Name         | Description                         | Arguments                       |
| ------------ | ----------------------------------- | ------------------------------- |
| `onTabClick` | Event handler for tab button click. | `event: ComponentEvent<string>` |

### Interfaces

### `TabBarData`

| Property     | Type       | Description                                                                                   |
| ------------ | ---------- | --------------------------------------------------------------------------------------------- |
| `id`         | `string`   | The unique identifier for the tab.                                                            |
| `[label]`    | `string`   | The label or title for the tab.                                                               |
| `[html]`     | `string`   | The HTML content for the tab.                                                                 |
| `[icon]`     | `IconName` | The icon to be displayed on the tab.                                                          |
| `[link]`     | `string`   | A URL to navigate to when tab button is clicked. This will override the `onTabClick` callback |
| `[selected]` | `boolean`  | Indicates whether the tab is selected.                                                        |
| `[disabled]` | `boolean`  | Indicates whether the tab is disabled.                                                        |
