#### Properties

#### `DateTimeProps`

| Property   | Type              | Description                               | Default |
| ---------- | ----------------- | ----------------------------------------- | ------- |
| `id`       | `string`          | The unique identifier for the component.  |         |
| `date`     | `boolean`         | Flag to include date input.               | `false` |
| `time`     | `boolean`         | Flag to include time input.               | `false` |
| `response` | `DateTimeValue[]` | Array of date-time values as ISO strings. | `[]`    |

##### Callbacks

| Name                 | Description                                                   | Arguments                   |
| -------------------- | ------------------------------------------------------------- | --------------------------- |
| `onDatetimeResponse` | Callback triggered when the date-time input value is changed. | `response: DateTimeValue[]` |

##### Interfaces

#### `DateTimeDefinitions`

| Name              | Type                                         |
| ----------------- | -------------------------------------------- |
| `currentTime`     | `Language['definitions']['currentTime']`     |
| `currentDate`     | `Language['definitions']['currentDate']`     |
| `currentDateTime` | `Language['definitions']['currentDateTime']` |
