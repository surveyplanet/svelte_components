<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { Button, Icon } from '../../lib';
	import { COLORS, BUTTON_MODES, SIZES } from '../../lib/_definitions';
	export let Hst;

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

	const clickHandler = (e: MouseEvent): void => {
		if (disabled) {
			return;
		}
		logEvent('click', e);
	};

	const source = `<Button {bgColor} {textColor}>{content}</Button>`;
</script>

<Hst.Story title="Button">
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
			bind:value={type}
			title="Type"
			options={['button', 'submit', 'reset']} />
		<Hst.Select
			bind:value={size}
			title="Size"
			options={Object.values(SIZES)} />
	</svelte:fragment>

	<Hst.Variant
		title="Button"
		{source}>
		<Button
			on:click={clickHandler}
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
		title="FAB - Floating action button"
		{source}>
		<Button
			on:click={clickHandler}
			{mode}
			{disabled}
			{loader}
			{round}
			{block}
			action={true}
			{type}
			{form}
			{size}>
			<Icon name="plus" />
		</Button>
	</Hst.Variant>
</Hst.Story>
