<script lang="ts">
	import Avatar from '$lib/Avatar.svelte';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';

	let events = $state<string[]>([]);

	let profileImage: string = $state('');

	let id: string = $state('');

	let size: 'small' | 'medium' | 'large' = $state('medium');

	let disabled = $state(false);

	const clickEventHandler = () => {
		console.log('clicked');
		events.push('click');
	};
</script>

<Layout
	component="Avatar"
	example={source(profileImage, id, size, disabled)}
	{md}
	{events}>
	<svelte:fragment slot="controls">
		<PropsContainer>
			<PropsChanger
				text="Profile Image"
				oninput={(e: Event) => {
			profileImage = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				text="Id"
				oninput={(e: Event) => {
			id = (e.target as HTMLInputElement).value;
		}} />
			<PropsChanger
				select="Size"
				selectOptions={['small', 'medium', 'large']}
				value={size}
				oninput={(e: Event) => {
			size = (e.target as HTMLInputElement).value as 'small' | 'medium' | 'large';
		}} />
			<PropsChanger
				boolean="Disabled"
				value={disabled}
				oninput={(e: Event) => {
			disabled = (e.target as HTMLInputElement).checked;
		}} />
		</PropsContainer>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<Avatar
			{profileImage}
			{id}
			{size}
			{disabled}
			onclick={clickEventHandler} />
	</svelte:fragment>
</Layout>

<style>
	.alert-wrapper {
		padding: 50px;
	}
</style>
