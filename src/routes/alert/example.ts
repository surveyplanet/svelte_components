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

  const alertConfirmHandler = (e) => {
    console.log('alertConfirmHandler', e.detail);
  };

  const alertOpenHandler = (e) => {
    console.log('alertOpenHandler', e.detail);
  };

  const alertInputHandler = (e) => {
    console.log('alertInputHandler', e.detail);
  };

  const alertCloseHandler = (e) => {
    console.log('alertCloseHandler', e.detail);
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
  onConfirm={alertConfirmHandler}
  onOpen={alertOpenHandler}
  onInput={alertInputHandler}
  onClose={alertCloseHandler}
  onOut={alertOutHandler}>
  	Alert body
</Alert>`;
};
