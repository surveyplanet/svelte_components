import { type IconProps } from '$lib';

export default (data: IconProps) => {
	return `
<script lang="ts">

import { Icon, type IconName, type IconSize } from '@surveyplanet/svelte_components';

</script>

<Icon 
	color='${data.color}' 
	size={${data.size}} 
	name='${data.name}' />
`;
};
