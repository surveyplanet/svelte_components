##### Properties

| Property                | Type    | Description                                                                                       | Default     |
| ----------------------- | ------- | ------------------------------------------------------------------------------------------------- | ----------- |
| `title`                 | string  | Main alert title.                                                                                 |             |
| `subtitle`              | string  | Optional alert subtitle.                                                                          |             |
| `type=`                 | string  | One of `info`, `warning`, `error`, or `success`.                                                  |             |
| `hideDelay`             | number  | Automatically hide alert after X milliseconds. A value of 0 means don't hide.                     |             |
| `confirm`               | boolean | Whether the alert needs to be confirmed before it is closed.                                      | `false`     |
| `confirmButtonLabel`    | string  | Text label for the confirm button.                                                                | `'Confirm'` |
| `cancelButtonLabel`     | string  | Text label for the cancel confirm button.                                                         | `'Cancel'`  |
| `challenge`             | string  | If provided alert displays a text input which must be valid before confirm button can be clicked. | `''`        |
| `challengeLabel`        | string  | The label for the challenge input.                                                                | `''`        |
| `animationMilliseconds` | number  | The total time in milliseconds for the alert to animate in or out.                                | `350`       |

##### Callbacks

| Name        | Description                                                   | Argument    |
| ----------- | ------------------------------------------------------------- | ----------- |
| `onOpen`    | Alert has been instantiated.                                  | `undefined` |
| `onIn`      | Alert is full rendered on stage and in animation is complete. | `undefined` |
| `onClose`   | Alert has been closed.                                        | `undefined` |
| `onOut`     | Alert has been fully removed and out animation is complete.   | `undefined` |
| `onConfirm` | Confirmation alert has been confirmed.                        | `undefined` |
