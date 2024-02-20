<script lang="ts">
	import { ComponentEvent, Toggle, type ToggleProps } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import md from './docs.md?raw';
	import { default as source } from './example';
	let events: ComponentEvent<boolean>[] = $state([]);

	let id: ToggleProps['id'] = $state(
		(Date.now() + Math.random()).toString(36)
	);
	let on: ToggleProps['on'] = $state(false);
	let disabled: ToggleProps['disabled'] = $state(false);
	let tall: ToggleProps['tall'] = $state(true);
	let name: ToggleProps['name'] = $state('');
	let label: ToggleProps['label'] = $state('Toggle switch');
	let prependLabel: ToggleProps['prependLabel'] = $state(false);

	const onToggleChange = (event: ComponentEvent<boolean>): void => {
		events.push(event);
	};
</script>

<Layout
	component="Toggle"
	example={source({ id, on, disabled, tall, name, label, prependLabel })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Name"
			bind:value={name} />
		<PropsChanger
			label="Label"
			bind:value={label} />
		<PropsChanger
			label="On"
			bind:value={on} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Tall"
			bind:value={tall} />

		<PropsChanger
			label="Prepend Label"
			bind:value={prependLabel} />
	{/snippet}
	{#snippet main()}
		<Toggle
			{onToggleChange}
			{id}
			{on}
			{disabled}
			{tall}
			{name}
			{label}
			{prependLabel} />
	{/snippet}
</Layout>

<style>
	.wrapper {
		padding: 1rem;
	}
</style>
