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
<script lang='ts'>

	import { Spinner } from '@surveyplanet/svelte-components';

	const onSpinnerChange = (value: number) => {
		console.log(value);
	}
	const onSpinnerUpdate = (value: number) => {
		console.log(value);
	}
	const onSpinnerInput = (value: number) => {
		console.log(value);
	}
	const onSpinnerBlur = () => {
		console.log('blur');
	}
	const onSpinnerFocus = () => {
		console.log('focus');
	}
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
	{onSpinnerChange}
	{onSpinnerUpdate}
	{onSpinnerInput}
	{onSpinnerBlur}
	{onSpinnerFocus}
/>
`;
};
