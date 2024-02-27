<script lang="ts">
	import { Checkbox, ComponentEvent, type CheckboxProps } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: ComponentEvent<string[]>[] = $state([]);

	let data: CheckboxProps['data'] = $state([
		{
			id: 'plato-checkbox',
			label: 'Plato',
			value: 'plato',
			disabled: false,
		},
		{
			id: 'aristotle-checkbox',
			label: 'Aristotle',
			value: 'aristotle',
			disabled: false,
		},
		{
			id: 'descartes-checkbox',
			label: 'Descartes',
			value: 'descartes',
			disabled: false,
		},
		{
			id: 'kant-checkbox',
			label: 'Kant',
			value: 'kant',
			disabled: false,
		},
		{
			id: 'nietzsche-checkbox',
			label: 'Nietzsche',
			value: 'nietzsche',
			disabled: false,
		},
	]);

	let group: CheckboxProps['group'] = $state(['kant']);

	let prependLabel: CheckboxProps['prependLabel'] = $state();

	let block: CheckboxProps['block'] = $state();

	let size: CheckboxProps['size'] = $state('small');

	const onCheckboxChange = (event: ComponentEvent<string[]>): void => {
		events.push(event);
	};
</script>

<Layout
	component="Checkbox"
	example={source({ group, data, prependLabel, size, block })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Group"
			bind:value={group} />

		<PropsChanger
			label="Data"
			bind:value={data} />

		<PropsChanger
			label="Size"
			bind:value={size}
			selectOptions={['small', 'medium', 'large']} />

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
		<Checkbox
			bind:group
			{data}
			{prependLabel}
			{block}
			{size}
			{onCheckboxChange} />
	{/snippet}
</Layout>
