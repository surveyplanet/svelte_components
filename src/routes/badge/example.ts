export default (
	color: 'yellow' | 'blue' | 'pink' | 'green',
	content: string,
	flat: boolean
) => {
	return `<script>
	import {Badge} from '@surveyplanet/svelte-components';

	const color = '${color}';
	const content = '${content}';
	const flat = ${flat};
</script>
<Badge {color} {content} {flat} ">Pro</Badge>
`;
};
