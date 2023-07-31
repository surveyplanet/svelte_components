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

	let id = '${id}';
	let on = ${on};
	let disabled = ${disabled};
	let tall = ${tall};
	let name = '${name}';
	let label = '${label}';
	let prependLabel = ${prependLabel};

	function changeEventHandler(on) {
		if (on) {
			console.log('Toggle ON 🎉');
		} else {
			console.log('Toggle OFF 😤');
		}
	}
</script>

<Toggle
	on:change={changeEventHandler}
	{id}
	{name}
	{label}
	{on}
	{prependLabel}
	{tall}
	{disabled} />
`;
};
