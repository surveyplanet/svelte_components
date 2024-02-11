### Properties

| Property                       | Type    | Description                                                                                       |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------- |
| `title`                        | string  | Main alert title.                                                                                 |
| `subtitle`                     | string  | Optional alert subtitle.                                                                          |
| `type=`                        | string  | One of `info`, `warning`, `error`, or `success`.                                                  |
| `hideDelay`                    | number  | Automatically hide alert after X milliseconds. A value of 0 means don't hide.                     |
| `confirm=false`                | boolean | Whether the alert needs to be confirmed before it is closed.                                      |
| `confirmButtonLabel='Confirm'` | string  | Text label for the confirm button.                                                                |
| `cancelButtonLabel='Cancel'`   | string  | Text label for the cancel confirm button.                                                         |
| `challenge=''`                 | string  | If provided alert displays a text input which must be valid before confirm button can be clicked. |
| `challengeLabel=''`            | string  | The label for the challenge input.                                                                |
| `animationMilliseconds=350`    | number  | The total time in milliseconds for the alert to animate in or out.                                |

### Callbacks

| Name        | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| `onOpen`    | Alert has been instantiated.                                  |
| `onIn`      | Alert is full rendered on stage and in animation is complete. |
| `onClose`   | Alert has been closed.                                        |
| `onOut`     | Alert has been fully removed and out animation is complete.   |
| `onConfirm` | Confirmation alert has been confirmed.                        |
