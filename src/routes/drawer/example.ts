import type { Snippet } from 'svelte';

export default (
	open: boolean,
	duration: number,
	placement: 'left' | 'right' | 'top' | 'bottom',
	size: string,
	children: Snippet
) => {
	return `
<script lang="ts">
	import {Drawer} from '@surveyplanet/svelte-components';
</script>

<Drawer
	{${open}}
	{${duration}}
	{${placement}}
	{${size}}
	{${children}} />
`;
};
