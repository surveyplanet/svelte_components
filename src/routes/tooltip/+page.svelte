<script lang="ts">
	import { tooltip, type ToolTipParameters } from '$lib/actions/tooltip';
	import { Layout, PropsChanger } from '../../layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let content: ToolTipParameters['content'] = $state(
		'This is a helpful tooltip!'
	);
	let placement: ToolTipParameters['placement'] = $state('left');

	let padding: ToolTipParameters['padding'] = $state(10);

	let changeCount = $state(0);

	// TODO: replace this hacky mess when PropsChanger callbacks are fixed
	let cache: ToolTipParameters;
	(() => {
		cache = { content, placement, padding };
	})();

	$effect.pre(() => {
		if (content !== cache.content) {
			changeCount += 1;
			cache.content = content;
		}
		if (placement !== cache.placement) {
			changeCount += 1;
			cache.placement = placement;
		}
		if (padding !== cache.padding) {
			changeCount += 1;
			cache.padding = padding;
		}
		console.log('changeCount', changeCount);
	});
</script>

<Layout
	component="Tooltip"
	example={source({ content, placement, padding })}
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
		<PropsChanger
			label="Padding"
			bind:value={padding} />
	{/snippet}
	{#snippet main()}
		{#key changeCount}
			<div
				class="hot-spot"
				use:tooltip={{ content, placement, padding }}>
				Hover here
			</div>
		{/key}
	{/snippet}
</Layout>

<style lang="scss">
	@use '@surveyplanet/styles' as *;
	.hot-spot {
		width: 100px;
		height: 100px;
		background-color: $color--green;
		line-height: 100px;
		text-align: center;
		font-size: 12px;
	}
</style>
