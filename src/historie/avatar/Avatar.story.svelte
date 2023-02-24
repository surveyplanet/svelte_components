<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { Avatar } from '../../lib';
	import { SIZES, MASCOTS } from '../../lib/_definitions.ts';
	import { default as source } from './source';

	export let Hst;

	let imgSrc = MASCOTS.marvin;
	let id = '';
	let size = SIZES.LARGE;
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
			title="Size"
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
			options={Object.keys(MASCOTS).map((key) => {
				return {
					label: key.charAt(0).toUpperCase() + key.slice(1),
					value: MASCOTS[key],
				};
			})} />

		<Hst.Text
			bind:value={id}
			title="Id" />
	</svelte:fragment>

	<Hst.Variant
		title="Avatar"
		{source}>
		<Avatar
			on:click={clickHandler}
			{imgSrc}
			{size}
			{disabled}
			{id} />
	</Hst.Variant>
</Hst.Story>
