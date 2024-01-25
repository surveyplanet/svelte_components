<script lang="ts">
	import { Button, BUTTON_MODES } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

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
	{events}>
	{#snippet controls()}
		<PropsContainer>
			<PropsChanger
				text="Content"
				value={content}
				oninput={(e: Event) => {
					content = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				select="Mode"
				value={mode}
				selectOptions={Object.values(BUTTON_MODES)}
				oninput={(e: Event) => {
					mode = (e.target as HTMLInputElement).value as typeof BUTTON_MODES[keyof typeof BUTTON_MODES];
				}} />
			<PropsChanger
				boolean="Disabled"
				value={disabled}
				oninput={(e: Event) => {
					(e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				boolean="Loader"
				value={loader}
				oninput={(e: Event) => {
					loader = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				boolean="Round"
				value={round}
				oninput={(e: Event) => {
					round = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				boolean="Block"
				value={block}
				oninput={(e: Event) => {
					block = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				boolean="Action"
				value={action}
				oninput={(e: Event) => {
					action = (e.target as HTMLInputElement).checked
				}} />
			<PropsChanger
				select="Type"
				value={type}
				selectOptions={['button', 'submit', 'reset']}
				oninput={(e: Event) => {
					type = (e.target as HTMLInputElement).value as 'button' | 'submit' | 'reset';
				}} />
			<PropsChanger
				select="Size"
				value={size}
				selectOptions={['small', 'medium', 'large']}
				oninput={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	{/snippet}
	{#snippet main()}
		<Button
			onclick={clickHandler}
			{mode}
			{disabled}
			{loader}
			{round}
			{block}
			{action}
			{type}
			{size}>
			Submit
		</Button>
	{/snippet}
</Layout>

<style lang="scss">
	.wrapper {
		padding: 1rem;
	}
</style>
