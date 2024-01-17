export default (
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
	id={labelOne.toLowerCase().replace(' ', '-')}
	{disabled}
	{name}
	value={labelOne}
	label={labelOne}
	{prependLabel}
	{size}
	on:change={changeEventHandler} />
<Radio
	id={labelTwo.toLowerCase().replace(' ', '-')}
	{disabled}
	{name}
	value={labelTwo}
	label={labelTwo}
	{prependLabel}
	{size}
	on:change={changeEventHandler} />
<Radio
	id={labelThree.toLowerCase().replace(' ', '-')}
	{disabled}
	{name}
	value={labelThree}
	label={labelThree}
	{prependLabel}
	{size}
	on:change={changeEventHandler} />		
`;
};
