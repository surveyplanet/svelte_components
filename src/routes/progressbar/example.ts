import type { ProgressBarProps } from '$lib';

export default (data: ProgressBarProps) => {
	return `
<script lang="ts">
	import { ProgressBar } from '@surveyplanet/svelte_components';
</script>
<ProgressBar
	speed={${data.speed}}
	max={${data.max}}
	value={${data.value}}
	displayValue={${data.displayValue}} />
`;
};
