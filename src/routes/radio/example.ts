export default (
	id: string,
	name: string,
	labelOne: string,
	disabled: boolean,
	prependLabel: boolean,
	size: 'small' | 'medium' | 'large'
) => {
	return `
	<script>
	import Radio from '@surveyplanet/svelte_components';

	let changeEventHandler = (event) => {
		console.log(event.detail);
</script>

<Radio
	id='${id}'
	disabled={${disabled}}
	name='${name}'
	label='${labelOne}'
	prependLabel={${prependLabel}}
	size='${size}'
	onChange={changeEventHandler} />
;

`;
};
