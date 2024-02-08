export default (
	id: string,
	on: boolean,
	disabled: boolean,
	tall: boolean,
	name: string,
	label: string,
	prependLabel: boolean
) => {
	return `<script>
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
	id='${id}'
	on={${on}}
	disabled={${disabled}}
	tall={${tall}}
	name='${name}'
	label='${label}'
	prependLabel={${prependLabel}}
	onChange={changeEventHandler}
	/>
`;
};
