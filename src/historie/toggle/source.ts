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
	on
	disabled
	tall
	on:change="{changeEventHandler}">
</Toggle>
`;
