import { type PopoverProps } from '$lib';

export default (data: PopoverProps) => {
	return `
<script lang="ts">
	import {Popover} from '@surveyplanet/svelte-components';
</script>

<Popover visible={${data.visible}}>
  ${data.children}
</Popover>
`;
};
