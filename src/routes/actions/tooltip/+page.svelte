<script lang="ts">
	import { tooltip, type ToolTipOptions } from '$lib/actions/tooltip';
	import { Layout, PropsChanger } from '../../../layout';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let content: ToolTipOptions['content'] = $state(
		'This is a helpful tooltip!'
	);
	let placement: ToolTipOptions['placement'] = $state('left');

	let padding: ToolTipOptions['padding'] = $state(10);

	let delay: ToolTipOptions['delay'] = $state(250);

	let changeCount = $state(0);

	let btoaProps = $derived(
		btoa(JSON.stringify({ content, placement, padding }))
	);

	const onPropsChangerInput = () => {
		changeCount++;
	};

	// document.onmousemove = function (e) {
	// 	var x = e.pageX;
	// 	var y = e.pageY;
	// 	e.target.title = 'X is ' + x + ' and Y is ' + y;
	// };
</script>

<Layout
	{btoaProps}
	component="Tooltip"
	example={source({ content, placement, padding })}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Content"
			bind:value={content}
			{onPropsChangerInput} />
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
			]}
			{onPropsChangerInput} />
		<PropsChanger
			label="Padding"
			bind:value={padding}
			{onPropsChangerInput} />
		<PropsChanger
			label="Delay"
			bind:value={delay}
			{onPropsChangerInput} />
	{/snippet}
	{#snippet main()}
		{#key changeCount}
			<div
				class="hot-spot"
				use:tooltip={{ content, placement, padding, delay }}>
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
