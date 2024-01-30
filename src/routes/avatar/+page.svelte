<script lang="ts">
	import { type AvatarProps, Avatar } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';

	import { default as source } from './example';
	import md from './docs.md?raw';

	let events = $state<string[]>([]);

	let profileImage: string = $state('');

	let id: string = $state('');

	let size: AvatarProps['size'] = $state('medium');

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
	{#snippet controls()}
		<PropsChanger
			label="Profile Image"
			text={true}
			bind:value={profileImage} />
		<PropsChanger
			label="Id"
			text={true}
			bind:value={id} />
		<PropsChanger
			label="Size"
			select={true}
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
		<PropsChanger
			label="Disabled"
			checkbox={true}
			bind:value={disabled} />
	{/snippet}
	{#snippet main()}
		<Avatar
			{profileImage}
			{id}
			{size}
			{disabled}
			onclick={clickEventHandler} />
	{/snippet}
</Layout>

<style>
	.alert-wrapper {
		padding: 50px;
	}
</style>
