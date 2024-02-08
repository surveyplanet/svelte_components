export default (
	title: string,
	subtitle: string,
	fullscreen: boolean,
	overlay: boolean,
	visible: boolean,
	size: 'small' | 'medium' | 'large' = 'medium'
) => {
	return `
<script>
import {Modal} from '@surveyplanet/svelte_components';
const openHandler = (event:CustomEvent) {
	console.log('Modal opened:', event.detail);
}
const inHandler = (event:CustomEvent) {
	console.log('Modal in:', event.detail);
}
const outHandler = (event:CustomEvent) {
	console.log('Modal out:', event.detail);
}
const closeHandler = (event:CustomEvent) {
	console.log('Modal closed:', event.detail);
}
</script>

<Modal
	size='${size}'
	visible={${visible}}
	title='${title}'
	subtitle='${subtitle}'
	fullscreen={${fullscreen}}
	overlay={${overlay}}
	onOpen={openHandler}
	onIn={inHandler}
	onOut={outHandler}
	onClose={closeHandler}>
	{#snippet header()}
	<p>
		Hall low lands den womans control the or. Might he which forgot
		she he him, if below isle where brow.
	</p>
	{/snippet}

	{#snippet header()}
		And visit not than sacred cell wins in not childe. Fabled most
		heart charms een feeble. Had his flatterers yes nor, from from
		cell soon once upon beyond so then, sore from dome condole was
		favour departed friend from moths.
	{/snippet}

	{#snippet header()}
		<p>&copy; Surveyplanet</p>
	{/snippet}

</Modal>
`;
};
