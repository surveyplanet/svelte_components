export default (
	id: string,
	name: string,
	value: string,
	checked: boolean,
	disabled: boolean,
	prependLabel: boolean,
	size: 'small' | 'medium' | 'large'
) => {
	return `
<script>
	import {Checkbox} from '@surveyplanet/svelte_components';
	const onCheckboxChange = (e: Event): void => {
		console.log(e)
	};
	
</script>

<Checkbox
	id='${id}'
	name='${name}'
	value='${value}'
	checked={${checked}}
	disabled={${disabled}}
	prependLabel={${prependLabel}}
	size='${size}'
	{onCheckboxChange}/>
`;
};
