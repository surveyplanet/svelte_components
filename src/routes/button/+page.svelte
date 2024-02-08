<script lang="ts">
	import { Button, BUTTON_MODES } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let content = $state('Submit');
	let mode = $state(BUTTON_MODES.primary);
	let disabled = $state(false);
	let loader = $state(false);
	let round = $state(false);
	let block = $state(false);
	let action = $state(false);
	let type: 'button' | 'submit' | 'reset' = $state('button');
	let size: 'small' | 'medium' | 'large' = $state('medium');

	const clickHandler = (): void => {
		events.push('click');
	};
</script>

<Layout
	component="Button"
	example={source(
		content,
		mode,
		disabled,
		loader,
		round,
		block,
		action,
		type,
		size
	)}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Content"
			bind:value={content} />
		<PropsChanger
			label="Mode"
			bind:value={mode}
			selectOptions={Object.values(BUTTON_MODES)} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
		<PropsChanger
			label="Loader"
			bind:value={loader} />
		<PropsChanger
			label="Round"
			bind:value={round} />
		<PropsChanger
			label="Block"
			bind:value={block} />
		<PropsChanger
			label="Action"
			bind:value={action} />
		<PropsChanger
			label="Type"
			bind:value={type}
			selectOptions={['button', 'submit', 'reset']} />
		<PropsChanger
			label="Size"
			bind:value={size}
			selectOptions={['small', 'medium', 'large']} />
	{/snippet}
	{#snippet main()}
		<Button
			onClick={clickHandler}
			{mode}
			{disabled}
			{loader}
			{round}
			{block}
			{action}
			{type}
			{size}>
			{content}
		</Button>
	{/snippet}
</Layout>

<style lang="scss">
	.wrapper {
		padding: 1rem;
	}
</style>
