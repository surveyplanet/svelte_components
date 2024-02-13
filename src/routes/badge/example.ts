import {type BadgeProps} from '$lib';

export default (
	data: BadgeProps & {content: string}
) => {
	return `
<script lang="ts">
	import {Badge} from '@surveyplanet/svelte-components';
</script>

<Badge
  color='${data.color}'
  content='${data.content}' 
  flat={${data.flat}}>
  Pro
</Badge>
`;
};
