<script lang="ts">
	import { Checkbox, ComponentEvent, type CheckboxProps } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: ComponentEvent<boolean>[] = $state([]);

	let id: CheckboxProps['id'] = $state(
		(Date.now() + Math.random()).toString(36)
	);
	let name: CheckboxProps['name'] = $state('checkbox');
	let value: CheckboxProps['value'] = $state('checkbox');
	let label: CheckboxProps['label'] = $state('Checkbox');

	let checked: CheckboxProps['checked'] = $state(false);
	let disabled: CheckboxProps['disabled'] = $state(false);
	let prependLabel: CheckboxProps['prependLabel'] = $state(false);
	let size: CheckboxProps['size'] = $state('small');

	const onCheckboxChange = (event: ComponentEvent<boolean>): void => {
		events.push(event);
	};
</script>

<Layout
	component="Checkbox"
	example={source({ id, name, value, checked, disabled, prependLabel, size })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Id"
			bind:value={id} />

		<PropsChanger
			label="Name"
			bind:value={name} />

		<PropsChanger
			label="Value"
			bind:value />

		<PropsChanger
			label="Label"
			bind:value={label} />

		<PropsChanger
			label="Checked"
			bind:value={checked} />

		<PropsChanger
			label="Disabled"
			bind:value={disabled} />

		<PropsChanger
			label="Prepend Label"
			bind:value={prependLabel} />
		<PropsChanger
			label="Size"
			bind:value={size}
			selectOptions={['small', 'medium', 'large']} />
	{/snippet}
	{#snippet main()}
		<Checkbox
			{id}
			{name}
			{label}
			{value}
			{checked}
			{disabled}
			{prependLabel}
			{size}
			{onCheckboxChange} />
	{/snippet}
</Layout>
