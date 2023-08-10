export default (speed: number, max: number, value: number) => {
	return `<script>
	import { ProgressBar } from 'components/ProgressBar';

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
