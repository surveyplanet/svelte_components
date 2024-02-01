<script lang="ts">
	import { Checkbox } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<Event[]>([]);

	let id: string = $state((Date.now() + Math.random()).toString(36));
	let name = $state('checkbox');
	let value: string;
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
			text
			bind:value={id} />
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
			onchange={changeEventHandler} />
	{/snippet}
</Layout>
