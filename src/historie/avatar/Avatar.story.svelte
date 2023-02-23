<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { Avatar } from '../../lib';
	import { SIZES, MASCOTS } from '../../lib/_definitions.ts';
	import { default as source } from './source';

	export let Hst;

	let imgSrc = MASCOTS.marvin;
	let id = 'avatarId';
	let size = SIZES.SMALL;
	let disabled = false;

	const clickHandler = (e: Event): void => {
		if (disabled) {
			return;
		}
		logEvent('click', e);
	};
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={size}
			id=""
			title="Size"
			size="SIZE.SMALL"
			options={[
				{ label: 'Small', value: SIZES.SMALL },
				{ label: 'Medium', value: SIZES.MEDIUM },
				{ label: 'Large', value: SIZES.LARGE },
			]} />
		<Hst.Checkbox
			bind:value={disabled}
			title="Disabled" />
		<Hst.Select
			bind:value={imgSrc}
			title="Mascot"
			options={[
				{ label: 'Marvin', value: MASCOTS.marvin },
				{ label: 'Morty', value: MASCOTS.morty },
				{ label: 'Rick', value: MASCOTS.rick },
				{ label: 'Squanchy', value: MASCOTS.squanchy },
				{ label: 'Summer', value: MASCOTS.summer },
				{ label: 'Tina', value: MASCOTS.tina },
			]} />
		<Hst.Text
			bind:value={id}
			title="Id" />
	</svelte:fragment>

	<Hst.Variant
		title="Primary"
		{source}>
		<Avatar
			on:click={clickHandler}
			{imgSrc}
			{size}
			{disabled}
			{id} />
	</Hst.Variant>
</Hst.Story>
