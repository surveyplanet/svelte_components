<script lang="ts">
	import { Button, Icon, BUTTON_MODES } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let content = 'Submit';
	let mode = BUTTON_MODES.primary;
	let disabled = false;
	let loader = false;
	let round = false;
	let block = false;
	let action = false;
	let type: 'button' | 'submit' | 'reset' = 'button';
	let size: 'small' | 'medium' | 'large' = 'medium';

	const clickHandler = (e: CustomEvent): void => {
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
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Content"
				textInputHandler={(e: Event) => {
					content = (e.target as HTMLInputElement).value;
				}} />
			<PropsChanger
				text="Mode"
				textInputHandler={(e: Event) => {
					mode = (e.target as HTMLInputElement).value as typeof BUTTON_MODES[keyof typeof BUTTON_MODES];
				}} />
			<PropsChanger
				text="Disabled"
				textInputHandler={(e: Event) => {
					disabled = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Loader"
				textInputHandler={(e: Event) => {
					loader = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Round"
				textInputHandler={(e: Event) => {
					round = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Block"
				textInputHandler={(e: Event) => {
					block = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Action"
				textInputHandler={(e: Event) => {
					action = (e.target as HTMLInputElement).value === 'true';
				}} />
			<PropsChanger
				text="Type"
				textInputHandler={(e: Event) => {
					type = (e.target as HTMLInputElement).value as 'button' | 'submit' | 'reset';
				}} />
			<PropsChanger
				text="Size"
				textInputHandler={(e: Event) => {
					size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
				}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Button
			on:click={clickHandler}
			{content}
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
	</svelte:fragment>
</Layout>

<style lang="scss">
	.wrapper {
		padding: 1rem;
	}
</style>
