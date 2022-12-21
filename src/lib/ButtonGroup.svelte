<script lang="ts">
	// import '@surveyplanet/styles.scss';
	import Button from './Button.svelte';

	export let options: any[] = [
		// {label: 'button', mode: 'secondary', size: 'medium', loader: true, disabled: false}
	];

	// change from horizontal to vertical
	export let vertical: boolean = false;
	// turnVertical();
</script>

<nav
	id="group"
	class="sp-button-group"
	class:vertical>
	{#each options as opt, i}
		{#if i === 0}
			<Button
				{...opt}
				style="border: 1px solid red;" />
		{:else if i === options.length - 1}
			<Button {...opt} />
		{:else}
			<Button {...opt} />
		{/if}
	{/each}
</nav>

<style lang="scss">
	.sp-button-group {
		&.vertical {
			display: flex;
			flex-direction: column;
			width: max-content;
			& :global(.sp-button) {
				margin: 0;
				border-radius: 0;

				&:first-child {
					border-top-left-radius: 3em;
					border-top-right-radius: 3em;
					border-bottom-left-radius: 0;
					border-bottom-right-radius: 0;
				}
				&:last-child {
					border-bottom-left-radius: 3em;
					border-bottom-right-radius: 3em;
					border-top-left-radius: 0;
					border-top-right-radius: 0;
				}
			}
		}
		& :global(.sp-button) {
			margin: 0;
			border-radius: 0;

			&:first-child {
				border-top-left-radius: 3em;
				border-bottom-left-radius: 3em;
			}
			&:last-child {
				border-top-right-radius: 3em;
				border-bottom-right-radius: 3em;
			}
		}
	}
</style>
