export default (
	speed: number,
	max: number,
	value: number,
	displayValue: boolean
) => {
	return `<script>
	import { ProgressBar } from '@surveyplanet/svelte_components';

	let speed = ${speed};
	let max = ${max};
	let value = ${value};
	let displayValue = ${displayValue};
</script>
<ProgressBar
	{speed}
	{max}
	{value} />
`;
};
