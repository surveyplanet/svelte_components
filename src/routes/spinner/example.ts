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
	return `<script>
	import Spinner from './Spinner.svelte';

	let label = '${label}';
	let step = ${step};
	let min = ${min};
	let max = ${max};
	let value = ${value};
	let disabled = ${disabled};
	let required = ${required};
	let overflow = ${overflow};
	let id = '${id}';
	let placeholder = '${placeholder}';
	let dragSpeed = ${dragSpeed};
	let size = ${size};
</script>

<Spinner
	{label}
	{step}
	{min}
	{max}
	{value}
	{disabled}
	{required}
	{overflow}
	{id}
	{placeholder}
	{dragSpeed}
	{size}	
/>
`;
};
