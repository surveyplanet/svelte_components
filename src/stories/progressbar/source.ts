export default (speed: number, max: number, value: number) => {
	return `<script>
	import { ProgressBar } from '@surveyplanet/svelte_components';

	let speed = ${speed};
	let max = ${max};
	let value = ${value};
</script>
<ProgressBar
	{speed}
	{max}
	{value} />
`;
};
