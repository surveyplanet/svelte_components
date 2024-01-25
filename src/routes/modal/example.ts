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
    let title = '${title}';
    let subtitle = '${subtitle}';
    let fullscreen = ${fullscreen};
    let overlay = ${overlay};
    let visible = ${visible};
    let size = '${size}';

</script>

<Modal
	bind:size
	bind:visible
	on:open={modalOpened}
	on:in={modalIn}
	on:out={modalOut}
	on:close={close}
	{title}
	{subtitle}
	{fullscreen}
	{overlay}>

	<p slot="header">
		Hall low lands den womans control the or. Might he which forgot
		she he him, if below isle where brow.
	</p>

	<svelte:fragment slot="body">
		And visit not than sacred cell wins in not childe. Fabled most
		heart charms een feeble. Had his flatterers yes nor, from from
		cell soon once upon beyond so then, sore from dome condole was
		favour departed friend from moths.
	{/snippet}

	<svelte:fragment slot="footer">
		<p>&copy; Surveyplanet</p>
	{/snippet}

</Modal>
`;
};
