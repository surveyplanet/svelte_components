import type { DropdownOptions } from '$lib';

export default (
	options: DropdownOptions[],
	searchThreshold: number,
	disabled: boolean,
	required: boolean,
	value: string | null,
	placeholder: string,
	label: string,
	size: 'small' | 'medium' | 'large'
) => {
	return `<script>
	import Dropdown from './Dropdown.svelte';

	const options = ${JSON.stringify(options)};
	const searchThreshold = ${searchThreshold};
	const disabled = ${disabled};
	const required = ${required};
	const value = ${value};
	const placeholder = ${placeholder};
	const label = ${label};
	const size = ${size};


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
