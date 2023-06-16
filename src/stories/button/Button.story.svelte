<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import source from './source';
	import { Button, Icon, BUTTON_MODES } from '../../lib';

	export let Hst: Histoire;

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
		if (disabled) {
			return;
		}
		logEvent('click', e);
	};
</script>

<Hst.Story
	title="Button"
	layout={{ type: 'grid', width: 200 }}>
	<svelte:fragment slot="controls">
		<Hst.Text
			bind:value={content}
			title="Title" />
		<Hst.Select
			bind:value={mode}
			title="Mode"
			options={Object.keys(BUTTON_MODES).map((key) => {
				let label = key.charAt(0).toUpperCase() + key.slice(1);
				label = label.replace(/_/g, ' ');
				return {
					label: label,
					value: BUTTON_MODES[key],
				};
			})} />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Checkbox
			bind:value={loader}
			title="Loader" />
		<Hst.Checkbox
			bind:value={round}
			title="Round" />
		<Hst.Checkbox
			bind:value={block}
			title="Block" />
		<Hst.Checkbox
			bind:value={action}
			title="Action" />
		<Hst.Select
			bind:value={size}
			title="Size"
			options={['small', 'medium', 'large']} />
		<Hst.Select
			bind:value={type}
			title="Type"
			options={['button', 'submit', 'reset']} />
	</svelte:fragment>

	<Hst.Variant
		title="Basic"
		{source}>
		<div class="wrapper">
			<Button
				on:click={clickHandler}
				data-testid="basic"
				{mode}
				{disabled}
				{loader}
				{round}
				{block}
				{action}
				{type}
				{size}>{content}</Button>
		</div>
	</Hst.Variant>

	<Hst.Variant
		title="Loader"
		{source}>
		<div class="wrapper">
			<Button
				on:click={clickHandler}
				data-testid="loader"
				{mode}
				disabled={true}
				loader={true}
				{round}
				{block}
				{action}
				{type}
				{size}>{content}</Button>
		</div>
	</Hst.Variant>

	<Hst.Variant
		title="Icon button"
		{source}>
		<div class="wrapper">
			<Button
				on:click={clickHandler}
				data-testid="icon"
				{mode}
				{disabled}
				{loader}
				{round}
				{block}
				{action}
				{type}
				{size}>
				<Icon
					name="search"
					color="white"
					size={20} /> Search
			</Button>
		</div>
	</Hst.Variant>

	<Hst.Variant
		title="FAB - Floating action button"
		{source}>
		<div class="wrapper">
			<Button
				on:click={clickHandler}
				data-testid="fab"
				{mode}
				{disabled}
				{loader}
				{round}
				{block}
				action={true}
				{type}
				{size}>
				<Icon
					name="plus"
					size={20}
					color="white" />
			</Button>
		</div>
	</Hst.Variant>
</Hst.Story>

<style lang="scss">
	.wrapper {
		padding: 1rem;
	}
</style>
