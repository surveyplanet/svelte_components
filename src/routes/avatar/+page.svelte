<script lang="ts">
	import { type AvatarProps, Avatar, ComponentEvent } from '$lib';
	import { Layout, PropsChanger } from '../../layout/index';

	import { default as source } from './example';
	import md from './docs.md?raw';

	let events = $state<ComponentEvent<undefined, HTMLButtonElement>[]>([]);

	// let profileImage: AvatarProps['profileImage'] = $state('');
	let profileImage: string = $state(
		'https://media.surveyplanet.com/testing/family.jpeg'
	);
	let userId: AvatarProps['userId'] = $state('a');
	let size: AvatarProps['size'] = $state('small');
	let disabled: AvatarProps['disabled'] = $state(false);

	const onAvatarClick = (
		event: ComponentEvent<undefined, HTMLButtonElement>
	) => {
		events.push(event);
	};

	let btoaProps = $derived(
		btoa(
			JSON.stringify({
				profileImage,
				userId,
				size,
				disabled,
			})
		)
	);
</script>

<Layout
	{btoaProps}
	component="Avatar"
	example={source({ userId, profileImage, size, disabled })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Profile Image"
			bind:value={profileImage} />
		<PropsChanger
			label="User ID"
			bind:value={userId} />
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
			{userId}
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
