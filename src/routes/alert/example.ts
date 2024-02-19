import type { AlertProps } from '$lib';

export default (data: AlertProps) => {
	return `
<script lang="ts">
	import { Alert, ComponentEvent } from '@surveyplanet/svelte-components';

    const onAlertOpen = (event: CustomEvent) => {
		console.log('alert opened', event);
	};
	const onAlertIn = (event: CustomEvent) => {
		console.log('alert in', event);
	};
	const onAlertClose = (event: CustomEvent) => {
		console.log('alert closed', event);
	};
	const onAlertOut = (event: CustomEvent) => {
		console.log('alert out', event);
	};
	const onAlertConfirm = (event: ComponentEvent<undefined>) => {
		console.log('alert confirmed');
	};
</script>

<Alert 
  visible='${data.visible}'
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
