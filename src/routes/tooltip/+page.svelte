<script lang="ts">
	import { tooltip, type ToolTipParameters } from '$lib/actions/tooltip';
	import { Layout, PropsChanger } from '../../layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let content: ToolTipParameters['content'] = $state(
		'This is a helpful tooltip!'
	);
	let placement: ToolTipParameters['placement'] = $state('left');
</script>

<Layout
	component="Tooltip"
	example={source({ content })}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Content"
			bind:value={content} />
		<PropsChanger
			label="Placement"
			bind:value={placement}
			selectOptions={[
				'top',
				'top-start',
				'top-end',
				'right',
				'right-start',
				'right-end',
				'bottom',
				'bottom-start',
				'bottom-end',
				'left',
				'left-start',
				'left-end',
			]} />
	{/snippet}
	{#snippet main()}
		{#key placement}
			<button use:tooltip={{ content, placement }}>Hover me</button>
		{/key}
	{/snippet}
</Layout>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.props {
		border: 1px solid black;
	}
	.wrapper {
		background-color: $color--beige;
		border-radius: $size-radius--small;
	}
</style>
