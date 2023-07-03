export default `
<script>
	import { Button, type BUTTON_MODES } from '@surveyplanet/svelte-components';

</script>


<Button
	on:click={clickHandler}
	mode={BUTTON_MODES.primary}
	size="small"
	round={true}
	> Submit
</Button>
`;
