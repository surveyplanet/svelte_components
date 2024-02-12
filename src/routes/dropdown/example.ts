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

	import {type DropdownOptions, Dropdown} from '@surveyplanet/svelte_components';

	options: DropdownOptions[] = ${JSON.stringify(options, null, 4)};

	const onDropdownChange = (e) => {
		console.log('change', e);
	}
</script>

<Dropdown
	{options}
	searchThreshold={${searchThreshold}}
	disabled={${disabled}}
	required={${required}}
	value={${value}}
	placeholder='${placeholder}'
	label='${label}'
	size='${size}'
	{onDropdownChange}
/>
`;
};
