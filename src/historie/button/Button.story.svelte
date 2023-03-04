<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import source from './source';
	import { Button, Icon } from '../../lib';
	import { BUTTON_MODES, SIZES } from '../../lib/_definitions';

	export let Hst: Histoire;

	let content = 'Submit';
	let mode = BUTTON_MODES.PRIMARY;
	let disabled = false;
	let loader = false;
	let round = false;
	let block = false;
	let action = false;
	let type: 'button' | 'submit' | 'reset' = 'button';
	let form: string | null = null;
	let size = SIZES.MEDIUM;

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
			options={Object.values(BUTTON_MODES)} />
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
			options={Object.values(SIZES)} />
		<Hst.Select
			bind:value={type}
			title="Type"
			options={['button', 'submit', 'reset']} />
	</svelte:fragment>

	<Hst.Variant
		title="Basic"
		{source}>
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
			{form}
			{size}>{content}</Button>
	</Hst.Variant>

	<Hst.Variant
		title="Loader"
		{source}>
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
			{form}
			{size}>{content}</Button>
	</Hst.Variant>

	<Hst.Variant
		title="Icon button"
		{source}>
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
			{form}
			{size}>
			<Icon
				name="search"
				size={20} /> Search
		</Button>
	</Hst.Variant>

	<Hst.Variant
		title="FAB - Floating action button"
		{source}>
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
			{form}
			{size}>
			<Icon
				name="plus"
				size={20}
				color="white" />
		</Button>
	</Hst.Variant>
</Hst.Story>
