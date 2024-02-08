export default (colors: string[], size: number, strokeWidth: 1 | 2 | 3 | 4) => {
	return `
<script>
	import { Loader } from 'components/Loader';
	
</script>


<Loader 
	colors='${colors}'
	size={${size}}
	strokeWidth={${strokeWidth}} />
`;
};
