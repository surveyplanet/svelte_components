<script lang="ts">
	import { type AvatarProps, Avatar } from '$lib';
	import { Layout, PropsChanger } from '../../layout/index';

	import { default as source } from './example';
	import md from './docs.md?raw';

	let events = $state<string[]>([]);

	let profileImage: string = $state('');
	// let profileImage: string = $state( 'https://media.surveyplanet.com/testing/family.jpeg' );

	let id: string = $state('a');

	let size: AvatarProps['size'] = $state('small');

	let disabled = $state(false);

	const onAvatarClick = () => {
		events.push('click');
	};
</script>

<Layout
	component="Avatar"
	example={source({ id, profileImage, size, disabled })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Profile Image"
			bind:value={profileImage} />
		<PropsChanger
			label="Id"
			bind:value={id} />
		<PropsChanger
			label="Size"
			selectOptions={['small', 'medium', 'large']}
			bind:value={size} />
		<PropsChanger
			label="Disabled"
			bind:value={disabled} />
	{/snippet}
	{#snippet main()}
		<Avatar
			{profileImage}
			{id}
			{size}
			{disabled}
			{onAvatarClick} />
	{/snippet}
</Layout>

<style>
	.alert-wrapper {
		padding: 50px;
	}
</style>
