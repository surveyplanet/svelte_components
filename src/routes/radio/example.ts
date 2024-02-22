import type { RadioProps } from "$lib";

export default (
 props: RadioProps
) => {
	return `
<script lang="ts">
	import {type RadioProps, Radio, ComponentEvent} from '@surveyplanet/svelte_components';
	const onRadioChange = (event: ComponentEvent<string>): void => {
		console.log(event)
	};

	let data: RadioProps['data'] = $state(${JSON.stringify(props.data, null, 4)});
	let group: RadioProps['group'] = $state(${JSON.stringify(props.group, null, 4)});
</script>

<Radio
	bind:group
	{data}
	prependLabel={${props.prependLabel}}
	size='${props.size}'
	block={${props.block}}
	{onRadioChange}/>
`;
};
