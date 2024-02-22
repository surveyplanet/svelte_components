<script lang="ts">
	import { Radio, type ComponentEvent, type RadioProps } from '$lib';

	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let events = $state<ComponentEvent<string>[]>([]);
	let data: RadioProps['data'] = $state([
		{
			id: 'harry-radio',
			label: 'Harry',
			value: 'harry',
		},
		{
			id: 'larry-radio',
			label: 'Larry',
			value: 'larry',
		},
		{
			id: 'moe-radio',
			label: 'Moe',
			value: 'moe',
		},
	]);

	let group: RadioProps['group'] = $state();
	let prependLabel: RadioProps['prependLabel'] = $state();
	let block: RadioProps['block'] = $state();
	let size: RadioProps['size'] = $state('small');

	const onRadioChange = (event: ComponentEvent<string>): void => {
		events.push(event);
	};
</script>

<Layout
	component="Radio"
	example={source({ group, data, prependLabel, size })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Group"
			type="string"
			bind:value={group} />
		<PropsChanger
			label="Data"
			bind:value={data} />
		<PropsChanger
			label="Size"
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
		<PropsChanger
			label="Prepend Label"
			type="boolean"
			bind:value={prependLabel} />
		<PropsChanger
			label="Block"
			type="boolean"
			bind:value={block} />
	{/snippet}

	{#snippet main()}
		<div id="wrapper">
			<Radio
				{data}
				{prependLabel}
				{size}
				{block}
				bind:group
				{onRadioChange} />
		</div>
	{/snippet}
</Layout>

<style lang="scss">
</style>
