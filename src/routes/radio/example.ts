export default (
	id: string,
	name: string,
	labelOne: string,
	labelTwo: string,
	labelThree: string,
	disabled: boolean,
	prependLabel: boolean,
	size: 'small' | 'medium' | 'large'
) => {
	return `
	<script>
	import Radio from '@surveyplanet/svelte_components';
	let name = '${name}';
	let labelOne = '${labelOne}';
	let labelTwo = '${labelTwo}';
	let labelThree = '${labelThree}';
	let disabled = ${disabled};
	let prependLabel = ${prependLabel};
	let size = '${size}';
	let changeEventHandler = (event) => {
		console.log(event.detail);
</script>

<Radio
	id='${id}'
	disabled=${disabled}
	name='${name}'
	value='${labelOne}'
	label='${labelOne}'
	prependLabel='${prependLabel}'
	size='${size}'
	onchange={changeEventHandler} />
;`;
};
