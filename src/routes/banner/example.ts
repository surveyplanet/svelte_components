import { type BannerProps } from '$lib';

export default (data: BannerProps & { content: string }) => {
	return `
<script lang="ts">
	import { Banner } from '@surveyplanet/svelte_components';
</script>

<Banner 
	title='${data.title}'
	type='${data.type}'
	visible={${data.visible}}
	hideDelay={${data.hideDelay}}>
	${data.content}
</Banner>
`;
};
