<script lang="ts">
	import { add_classes } from 'svelte/internal';
	import Button from './Button.svelte';

	export let options: any[] = [
		// {label: 'button', mode: 'secondary', size: 'medium', disabeled: false, dropdownLabels: []}
	];

	let buttonText: string = options[0].label;
	let showMenu: boolean = false;
	function toggleMenu() {
		console.log(options[0].dropdownLabels);
		if (showMenu) {
			closeMenu();
		} else {
			openMenu();
		}
	}

	function selectOption(opt: any) {
		buttonText = opt.label;
		showMenu = false;
		closeMenu();
	}

	function closeMenu() {
		showMenu = false;
		console.log('closeMenu');
	}

	function openMenu() {
		showMenu = true;
		console.log('openMenu');
	}
</script>

<div>
	<button on:click={toggleMenu}>
		{buttonText}
	</button>
	{#if showMenu}
		<div>
			{#each options[0].dropdownLabels as opt}
				<button
					on:click={() => selectOption(opt)}
					class="sp-dropdown">{opt.label}</button>
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.sp-dropdown {
		background-color: white;
		border: 1px solid black;
		border-radius: 0;
	}
</style>
