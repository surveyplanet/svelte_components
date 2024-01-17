<script lang="ts">
	import { Checkbox } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let id: string;
	let name: 'checkbox';
	let value: string;
	let checked = false;
	let disabled = false;
	let prependLabel = false;
	let size: 'small' | 'medium' | 'large' = 'small';

	const changeEventHandler = (e: Event): void => {
		events.push('change');
	};
</script>

<Layout
	component="Checkbox"
	example={source(id, name, value, checked, disabled, prependLabel, size)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="id"
				value={id}
				textInputHandler={(e: Event) => {
					id = (e.target as HTMLInputElement).value;
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Checkbox
			{id}
			{name}
			{value}
			{checked}
			{disabled}
			{prependLabel}
			{size}
			on:change={changeEventHandler} />
	</svelte:fragment>
</Layout>
