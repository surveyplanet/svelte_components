<script lang="ts">
	import ButtonGroup from './ButtonGroup.svelte';
	import Button from './Button.svelte';
	export let options: any[] = [
		// {label: 'button', mode: 'secondary', size: 'medium', disabeled: false, dropdownLabels: []}
	];

	let buttonText: string = options[0].label;
	let showMenu: boolean = false;
	function toggleMenu() {
		if (showMenu) {
			closeMenu();
		} else {
			openMenu();
		}
	}
	function handleClick(e) {
		toggleMenu();
		if (e.target === document.querySelector('.sp-dropdown')) {
			selectOption(e.target);
		}
	}

	//TODO: buttonText won't change when the dropdown is clicked
	function selectOption(opt: any) {
		buttonText = opt.label;
		showMenu = false;
		closeMenu();
		console.log('selected option:' + opt);
	}

	function closeMenu() {
		showMenu = false;
	}

	function openMenu() {
		showMenu = true;
	}
</script>

<Button
	label={buttonText}
	on:click{handleClick} />
<div>
	{#if showMenu}
		<div class="sp-dropdown">
			<ButtonGroup
				options={options[0].dropdownLabels}
				vertical />
		</div>
	{/if}
</div>

<style lang="scss">
	.sp-dropdown {
		border: 1px solid black;
		border-radius: 0;
	}
</style>
