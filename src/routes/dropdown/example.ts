import type { DropdownOptions } from '$lib';

export default (
	options: DropdownOptions[],
	searchThreshold: number,
	disabled: boolean,
	required: boolean,
	value: string | undefined,
	placeholder: string,
	label: string,
	size: 'small' | 'medium' | 'large'
) => {
	return `<script>
	import {Dropdown} from '@surveyplanet/svelte_components';

	const options = ${JSON.stringify(options, null, 2)};
	const searchThreshold = ${searchThreshold};
	const disabled = ${disabled};
	const required = ${required};
	const value = '${value}';
	const placeholder = '${placeholder}';
	const label = '${label}';
	const size = '${size}';


</script>

<Dropdown
	{options}
	{searchThreshold}
	{disabled}
	{required}
	{value}
	{placeholder}
	{label}
	{size}
/>
`;
};
