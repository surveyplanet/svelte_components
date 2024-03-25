import type { CheckboxProps } from '$lib';

export default (props: CheckboxProps) => {
	return `
<script lang="ts">
	import {type CheckboxProps, Checkbox, ComponentEvent} from '@surveyplanet/svelte_components';
	const onCheckboxChange = (event: ComponentEvent<string[]>): void => {
		console.log(event)
	};

	let data: CheckboxProps['data'] = $state(${JSON.stringify(props.data, null, 4)});
	let group: CheckboxProps['group'] = $state(${JSON.stringify(props.group, null, 4)});
</script>

<Checkbox
	bind:group
	{data}
	prependLabel={${props.prependLabel}}
	size='${props.size}'
	block={${props.block}}
	{onCheckboxChange}/>
`;
};
