export default (
	label: string,
	step: number,
	min: number,
	max: number,
	value: number | undefined,
	disabled: boolean,
	required: boolean,
	overflow: boolean,
	id: string,
	placeholder: string,
	dragSpeed: number,
	size: 'small' | 'medium' | 'large'
) => {
	return `
<script>

	import { Spinner } from '@surveyplanet/svelte-components';

</script>

<Spinner
	label='${label}'
	step={${step}}
	min={${min}}
	max={${max}}
	value={${value}}
	disabled={${disabled}}
	required={${required}}
	overflow={${overflow}}
	id='${id}'
	placeholder='${placeholder}'
	dragSpeed={${dragSpeed}}
	size='${size}'
/>
`;
};
