export default (colors: string[], size: number, strokeWidth: 1 | 2 | 3 | 4) => {
	return `
<script>
	import { Loader } from 'components/Loader';
	let colors = ${colors};
	let size = ${size};
	let strokeWidth = ${strokeWidth};
</script>


<Loader {colors} {size} {strokeWidth} />
`;
};
