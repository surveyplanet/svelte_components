export default (
	title: string,
	subtitle: string,
	type: 'info' | 'warning' | 'error' | 'success',
	hideDelay: number,
	confirm: boolean,
	confirmButtonLabel: string,
	cancelButtonLabel: string,
	challenge: string
) => {
	return `
<script lang="ts">
	import { Alert } from '@surveyplanet/svelte-components';

  const onConfirmHandler = (e) => {
    console.log('onConfirm', e.detail);
  };

  const onOpenHandler = (e) => {
    console.log('onOpen', e.detail);
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
  onConfirm={onConfirmHandler}
  onOpen={onOpenHandler}
  onInput={onInputHandler}
  onClose={onCloseHandler}
  onOut={onOutHandler}>
  	Alert body
</Alert>`;
};
