export default (
	color: 'yellow' | 'blue' | 'pink' | 'green',
	content: string,
	flat: boolean
) => {
	return `
	<script>
	
		import {Badge} from '@surveyplanet/svelte-components';

	</script>

	<Badge
	  color='${color}'
	  content = '${content}' 
	  flat = ${flat} 
	  >Pro</Badge>
`;
};
