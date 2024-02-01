export default (
	content: string,
	title: string,
	type: 'info' | 'warning' | 'error' | 'success',
	visible: boolean,
	hideDelay: number
) => {
	return `
	<script lang='ts>

		import { Banner } from '@surveyplanet/svelte_components';

	</script>
	<Banner 
		title="${title}" 
		type="${type}"
		visible={${visible}}
		hideDelay={${hideDelay}}>
		${content}
	</Banner>
`;
};
