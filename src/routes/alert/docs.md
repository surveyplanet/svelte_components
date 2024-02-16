### Properties

| Property                         | Type    | Description                                                                                       |
| -------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `[title]`                        | string  | Main alert title.                                                                                 |
| `[subtitle]`                     | string  | Optional alert subtitle.                                                                          |
| `[type='success']`               | string  | One of `info`, `warning`, `error`, or `success`.                                                  |
| `[hideDelay]`                    | number  | Automatically hide alert after X milliseconds. A value of 0 means don't hide.                     |
| `[confirm]`                      | boolean | Whether the alert needs to be confirmed before it is closed.                                      |
| `[confirmButtonLabel='Confirm']` | string  | Text label for the confirm button.                                                                |
| `[cancelButtonLabel='Cancel']`   | string  | Text label for the cancel confirm button.                                                         |
| `[challenge]`                    | string  | If provided alert displays a text input which must be valid before confirm button can be clicked. |
| `[challengeLabel]`               | string  | The label for the challenge input.                                                                |
| `[animationMilliseconds=350]`    | number  | The total time in milliseconds for the alert to animate in or out.                                |

### Callbacks

| Name             | Description                                                   | Arguments                          |
| ---------------- | ------------------------------------------------------------- | ---------------------------------- |
| `onAlertOpen`    | Alert has been instantiated.                                  | `event: CustomEvent`               |
| `onAlertIn`      | Alert is full rendered on stage and in animation is complete. | `event: CustomEvent`               |
| `onAlertClose`   | Alert has been closed.                                        | `event: CustomEvent`               |
| `onAlertOut`     | Alert has been fully removed and out animation is complete.   | `event: CustomEvent`               |
| `onAlertConfirm` | Confirmation alert has been confirmed.                        | `event: ComponentEvent<undefined>` |
