<script lang="ts">
	import { Banner } from '$lib';
	import { Layout, PropsChanger } from '$layout/layout_index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state([]) as string[];

	let title = $state('');
	let type: 'info' | 'warning' | 'error' | 'success' = $state('info');
	let visible = $state(true);
	let hideDelay = $state(0);
	let content = $state(
		'Your email address has not been verified. For your security please <a href="https://surveyplanet.com/verify-email"> verify your email</a> address before logging in.'
	);
</script>

<Layout
	component="Banner"
	example={source(content, title, type, visible, hideDelay)}
	{md}
	{events}>
	{#snippet controls()}
		<PropsChanger
			label="title"
			text
			bind:value={title} />
		<PropsChanger
			label="type"
			bind:value={type}
			select
			selectOptions={['info', 'warning', 'error', 'success']} />
		<PropsChanger
			label="visible"
			bind:value={visible}
			checkbox />
		<PropsChanger
			label="hideDelay"
			bind:value={hideDelay}
			number />
		<PropsChanger
			label="content"
			bind:value={content}
			text />
	{/snippet}
	{#snippet main()}
		<div class="banner-wrapper">
			<Banner
				{title}
				{type}
				{visible}
				{hideDelay}>{@html content}</Banner>
		</div>
	{/snippet}
</Layout>

<style>
	.banner-wrapper {
		padding: 50px;
	}
</style>
