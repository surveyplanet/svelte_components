export default `<script>
	import { Button } from '@surveyplanet/svelte-components';

</script>


<Button
	on:click={clickHandler}
	mode="primary"
	size="small"
	round="true"
	> Submit
</Button>
`;
