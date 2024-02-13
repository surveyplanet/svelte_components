import type { AlertProps } from '$lib';

export default (
	data: AlertProps 
) => {
	return `
<script lang="ts">
	import { Alert } from '@surveyplanet/svelte-components';

  const onAlertOpen = () => {
		console.log('alert opened');
	};
	const onAlertIn = () => {
		console.log('alert in');
	};
	const onAlertClose = () => {
		console.log('alert closed');
	};
	const onAlertOut = () => {
		console.log('alert out');
	};
	const onAlertConfirm = () => {
		console.log('alert confirmed');
	};
</script>

<Alert 
  title='${data.title}'
  subtitle='${data.subtitle}'
  type='${data.type}'
  hideDelay={${data.hideDelay}}
  confirm={${data.confirm}}
  confirmButtonLabel='${data.confirmButtonLabel}'
  cancelButtonLabel='${data.cancelButtonLabel}'
  challenge='${data.challenge}'
  {onAlertOpen}
  {onAlertIn}
  {onAlertClose}
  {onAlertOut}
  {onAlertConfirm}>
   Alert body
</Alert>`;
};
