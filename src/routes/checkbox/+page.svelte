<script lang="ts">
	import { Checkbox } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<Event[]>([]);

	let id: string = $state((Date.now() + Math.random()).toString(36));
	let name = $state('checkbox');
	let value: string = $state('checkbox');
	let label = $state('Checkbox');

	let checked = $state(false);
	let disabled = $state(false);
	let prependLabel = $state(false);
	let size: 'small' | 'medium' | 'large' = $state('small');

	const changeEventHandler = (e: Event): void => {
		events.push(e);
	};
</script>

<Layout
	component="Checkbox"
	example={source(id, name, value, checked, disabled, prependLabel, size)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="id"
			bind:value={id} />

		<PropsChanger
			label="name"
			bind:value={name} />

		<PropsChanger
			label="value"
			bind:value />

		<PropsChanger
			label="label"
			bind:value={label} />

		<PropsChanger
			label="checked"
			bind:value={checked} />

		<PropsChanger
			label="disabled"
			bind:value={disabled} />

		<PropsChanger
			label="prependLabel"
			bind:value={prependLabel} />
		<PropsChanger
			label="size"
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
			onChange={changeEventHandler} />
	{/snippet}
</Layout>
