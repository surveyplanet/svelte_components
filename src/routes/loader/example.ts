import type { LoaderProps } from "$lib";

export default ( data: LoaderProps) => {
	return `
<script>
	import { Loader } from 'components/Loader';
	
</script>


<Loader 
	colors='${data.colors}'
	size={${data.size}}
	strokeWidth={${data.strokeWidth}} />
`;
};
