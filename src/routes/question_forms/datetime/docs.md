### Properties

### `DateTimeProps`

| Property        | Type              | Description                               |
| --------------- | ----------------- | ----------------------------------------- |
| `id`            | `string`          | The unique identifier for the component.  |
| `date={false}`  | `boolean`         | Flag to include date input.               |
| `time={false}`  | `boolean`         | Flag to include time input.               |
| `response={[]}` | `DateTimeValue[]` | Array of date-time values as ISO strings. |

### Callbacks

| Name                 | Description                                                   | Arguments                   |
| -------------------- | ------------------------------------------------------------- | --------------------------- |
| `onDateTimeResponse` | Callback triggered when the date-time input value is changed. | `response: DateTimeValue[]` |

### Interfaces

### `DateTimeDefinitions`

| Name              | Type                                         |
| ----------------- | -------------------------------------------- |
| `currentTime`     | `Language['definitions']['currentTime']`     |
| `currentDate`     | `Language['definitions']['currentDate']`     |
| `currentDateTime` | `Language['definitions']['currentDateTime']` |
