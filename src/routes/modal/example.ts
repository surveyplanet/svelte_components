import { type ModalProps } from '$lib';

export default (data: ModalProps) => {
	return `
<script lang ="ts" >
	import {Modal} from '@surveyplanet/svelte_components';
	const onModalIntroStart = (event:CustomEvent) {
		console.log('Modal opened:', event.detail);
	}
	const onModalIntroEnd = (event:CustomEvent) {
		console.log('Modal in:', event.detail);
	}
	const onModalOutroStart = (event:CustomEvent) {
		console.log('Modal out:', event.detail);
	}
	const onModalOutroEnd = (event:CustomEvent) {
		console.log('Modal closed:', event.detail);
	}
</script>

<Modal
	size='${data.size}'
	visible={${data.visible}}
	title='${data.title}'
	subtitle='${data.subtitle}'
	fullscreen={${data.fullscreen}}
	overlay={${data.overlay}}
	{onModalIntroStart}
	{onModalIntroEnd}
	{onModalOutroStart}
	{onModalOutroEnd}>

	{#snippet header()}
	<p>
		Hall low lands den womans control the or. Might he which forgot
		she he him, if below isle where brow.
	</p>
	{/snippet}

	{#snippet body()}
		And visit not than sacred cell wins in not childe. Fabled most
		heart charms een feeble. Had his flatterers yes nor, from from
		cell soon once upon beyond so then, sore from dome condole was
		favour departed friend from moths.
	{/snippet}

	{#snippet footer()}
		<p>&copy; Surveyplanet</p>
	{/snippet}

</Modal>
`;
};
