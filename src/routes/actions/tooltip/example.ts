import type { ToolTipOptions } from '$lib';

export default (data: ToolTipOptions) => {
	return `
<script lang="ts">
	import {tooltip} from '@surveyplanet/svelte-components';
</script>

<button use:tooltip={{
	content: '${data.content}',
	placement: '${data.placement}',
	padding: {${data.padding}} }}> 
	Click me
</button>
`;
};
