import {
	Meta,
	Canvas,
	ColorPalette,
	ColorItem,
	Description,
	Story,
} from '@storybook/addon-docs';

import { Alert } from '../../lib';

<Meta
	title="Alert/Documentation"
	component={Alert}
/>

# Alert component

<div id="example">
	<Story id="alert-default--default" />
	<br />
	<Story id="alert-default--challenge" />
</div>

## Usage

```ts
<script>
	import {Alert} from '@surveyplanet/svelte-components';
</script>
<Alert title="You're settings has been saved."/>
```

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

| Name        | description                                                   |
| ----------- | ------------------------------------------------------------- |
| `open`      | Alert has been instantiated.                                  |
| `in`        | Alert is full rendered on stage and in animation is complete. |
| `close`     | Alert has been closed.                                        |
| `out`       | Alert has been fully removed and out animation is complete.   |
| `confirmed` | Confirmation alert has been confirmed.                        |
