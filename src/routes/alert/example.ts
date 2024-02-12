import type { AlertProps } from '$lib';

export default (
	title: string,
	subtitle: string,
	type: AlertProps['type'],
	hideDelay: number,
	confirm: boolean,
	confirmButtonLabel: string,
	cancelButtonLabel: string,
	challenge: string
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
  title='${title}'
  subtitle='${subtitle}'
  type='${type}'
  hideDelay={${hideDelay}}
  confirm={${confirm}}
  confirmButtonLabel='${confirmButtonLabel}'
  cancelButtonLabel='${cancelButtonLabel}'
  challenge='${challenge}'
  {onAlertOpen}
  {onAlertIn}
  {onAlertClose}
  {onAlertOut}
  {onAlertConfirm}>
   Alert body
</Alert>`;
};
