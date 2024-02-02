# DateTime Component

The `DateTime` component is used to capture date and/or time responses in a survey question.

### Interface

#### `DateTimeDefinitions`

| Name              | type                                         |
| ----------------- | -------------------------------------------- |
| `currentTime`     | `Language['definitions']['currentTime']`     |
| `currentDate`     | `Language['definitions']['currentDate']`     |
| `currentDateTime` | `Language['definitions']['currentDateTime']` |

### Properties

#### `DateTimeProps`

| Property   | Type              | Description                               |
| ---------- | ----------------- | ----------------------------------------- |
| `id`       | `string`          | The unique identifier for the component.  |
| `date`     | `boolean`         | Flag to include date input.               |
| `time`     | `boolean`         | Flag to include time input.               |
| `response` | `DateTimeValue[]` | Array of date-time values as ISO strings. |

### Callbacks

| Name                 | Description                                                   | Type                                  |
| -------------------- | ------------------------------------------------------------- | ------------------------------------- |
| `onDatetimeResponse` | Callback triggered when the date-time input value is changed. | `(response: DateTimeValue[]) => void` |
