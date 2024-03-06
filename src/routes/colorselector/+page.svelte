<script lang="ts">
	import { COLORS, ColorSelector, type ComponentEvent } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: ComponentEvent<string, HTMLInputElement>[] = $state([]);

	let value = $state(COLORS.pink);

	const onColorSelectorChange = (
		event: ComponentEvent<string, HTMLInputElement>
	): void => {
		events.push(event);
	};

	const onColorSelectorInput = (
		event: ComponentEvent<string, HTMLInputElement>
	): void => {
		events.push(event);
	};

	let btoaProps = $derived(
		btoa(
			JSON.stringify({
				value,
			})
		)
	);
</script>

<Layout
	{btoaProps}
	component="Chips"
	example={source({ value })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Data"
			bind:value />
	{/snippet}
	{#snippet main()}
		<ColorSelector
			bind:value
			{onColorSelectorChange}
			{onColorSelectorInput} />
	{/snippet}
</Layout>
