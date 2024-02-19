<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type PopoverProps, Popover } from '$lib';
	import { Layout, PropsChanger } from '../../layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';

	let visible = $state<PopoverProps['visible']>(true);
	let children: PopoverProps['children'] = $state(
		[
			`<p>And visit not than sacred cell wins in not childe. Fabled most heart charms een feeble. Had his flatterers yes nor, from from cell soon once upon beyond so then, sore from dome condole was favour departed friend from moths.</p>`,
			`<p>And visit not than sacred cell wins in not childe. Fabled most heart charms een feeble. Had his flatterers yes nor, from from cell soon once upon beyond so then, sore from dome condole was favour departed friend from moths.</p>`,
			`<p>And visit not than sacred cell wins in not childe. Fabled most heart charms een feeble. Had his flatterers yes nor, from from cell soon once upon beyond so then, sore from dome condole was favour departed friend from moths.</p>`,
		].join('\n')
	) as unknown as Snippet;
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<Layout
	component="Popover"
	example={source({ visible, children })}
	{md}>
	{#snippet controls()}
		<PropsChanger
			label="Visible"
			type="boolean"
			bind:value={visible} />
		<PropsChanger
			label="Content"
			bind:value={children} />
	{/snippet}
	{#snippet main()}
		<Popover {visible}>
			{@html children}
		</Popover>
	{/snippet}
</Layout>

<style lang="scss">
</style>
