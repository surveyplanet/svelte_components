# Alert component

### Properties

| Property                       | type    | description                                                                                       |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------------- |
| `title`                        | String  | Main alert title.                                                                                 |
| `subtitle`                     | String  | Optional alert subtitle.                                                                          |
| `type='success'`               | String  | One of `info`, `warning`, `error`, or `success`.                                                  |
| `hideDelay=0`                  | Number  | Automatically hide alert after X milliseconds. A value of 0 means don't hide.                     |
| `confirm=false`                | Boolean | Whether the alert needs to be confirmed before it is closed.                                      |
| `confirmButtonLabel='Confirm'` | String  | Text label for the confirm button.                                                                |
| `cancelButtonLabel='Cancel'`   | String  | Text label for the cancel confirm button.                                                         |
| `challenge`                    | String  | If provided alert displays a text input which must be valid before confirm button can be clicked. |
| `challengeLabel`               | String  | The label for the challenge input.                                                                |
| `animationMilliseconds=1000`   | Number  | The total time in milliseconds for the alert to animate in or out.                                |

### Events

| Name      | description                                                   |
| --------- | ------------------------------------------------------------- |
| `onopen`  | Alert has been instantiated.                                  |
| `onin`    | Alert is full rendered on stage and in animation is complete. |
| `onclose` | Alert has been closed.                                        |
| `onout`   | Alert has been fully removed and out animation is complete.   |
| `confirm` | Confirmation alert has been confirmed.                        |
