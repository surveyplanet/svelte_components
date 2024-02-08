import { type IconName, type IconSize } from '$lib';

export default (color: string, size: IconSize, name: IconName) => {
	return `
<script lang ='ts'>

import { Icon, type IconName, type IconSize } from '@surveyplanet/svelte_components';

</script>

<Icon 
	color='${color}' 
	size='${size}' 
	name='${name}' />
`;
};
