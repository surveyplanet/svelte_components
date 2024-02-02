export default (
	speed: number,
	max: number,
	value: number,
	displayValue: boolean
) => {
	return `
<script>

	import { ProgressBar } from '@surveyplanet/svelte_components';

</script>
<ProgressBar
	speed = ${speed}
	max = ${max}
	value = ${value}
	displayValue = ${displayValue}
	/>
`;
};
