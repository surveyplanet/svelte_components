import { type BadgeProps } from '$lib';

export default (data: BadgeProps & { content: string }) => {
	return `
<script lang="ts">
	import {Badge} from '@surveyplanet/svelte-components';
</script>

<Badge
  color='${data.color}'
  flat={${data.flat}}>
  ${data.content}
</Badge>
`;
};
