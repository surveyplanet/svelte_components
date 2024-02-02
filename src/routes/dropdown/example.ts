import type { DropdownOptions } from '$lib';

export default (
	options: DropdownOptions[],
	searchThreshold: number,
	disabled: boolean,
	required: boolean,
	value: DropdownOptions['id'],
	placeholder: string,
	label: string,
	size: 'small' | 'medium' | 'large'
) => {
	return `
<script>

	import {Dropdown, DropdownOptions} from '@surveyplanet/svelte_components';

	const dropdownChangeHandler = (e) => {
		console.log('change', e);
	}
</script>

<Dropdown
	options = ${JSON.stringify(options, null, 2)}
	searchThreshold = ${searchThreshold}
	disabled = ${disabled}
	required = ${required}
	value = ${value}
	placeholder = '${placeholder}'
	label = '${label}'
	size = '${size}'
	onchange = {dropdownChangeHandler}
/>
`;
};
