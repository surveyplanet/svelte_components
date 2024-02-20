<script lang="ts">
	import { Button, ComponentEvent, type ButtonProps } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events: ComponentEvent<undefined>[] = $state([]);

	let mode: ButtonProps['mode'] = $state('primary');
	let disabled: ButtonProps['disabled'] = $state(false);
	let loader: ButtonProps['loader'] = $state(false);
	let round: ButtonProps['round'] = $state(false);
	let block: ButtonProps['block'] = $state(false);
	let action: ButtonProps['action'] = $state(false);
	let type: ButtonProps['type'] = $state('button');
	let size: ButtonProps['size'] = $state('medium');
	let content = $state('Submit');

	const onButtonClick = (event: ComponentEvent<undefined>): void => {
		events.push(event);
	};
</script>

<Layout
	component="Button"
	example={source({
		content,
		mode,
		disabled,
		loader,
		round,
		block,
		action,
		type,
		size,
	})}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Content"
			bind:value={content} />
		<PropsChanger
			label="Mode"
			bind:value={mode}
			selectOptions={Object.values([
				'primary',
				'light',
				'accent',
				'accent-alt1',
				'accent-alt2',
				'accent-alt3',
				'outline',
			])} />
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
			{onButtonClick}
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
