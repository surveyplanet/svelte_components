import { type IconName, type IconSize } from '$lib';

export default (color: string, size: IconSize, name: IconName) => {
	return `
import { Icon, type IconName, type IconSize } from '@surveyplanet/svelte_components';
<Icon color="${color}" size={${size}} name="${name}" />
`;
};
