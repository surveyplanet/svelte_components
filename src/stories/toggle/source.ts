export default `<script>
	import { Toggle } from '@surveyplanet/svelte-components';
	function changeEventHandler(on) {
		if (on) {
			console.log('Toggle ON 🎉');
		} else {
			console.log('Toggle OFF 😤');
		}
	}
</script>

<Toggle
	{on}
	{tall}
	name="toggle"
	on:change="{changeEventHandler}">
</Toggle>
`;
