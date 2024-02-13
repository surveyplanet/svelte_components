<script lang="ts">
	import { Banner } from '$lib';
	import { Layout, PropsChanger } from '$layout/index';
	import { default as source } from './example';
	import md from './docs.md?raw';
	let events = $state<string[]>([]);

	let title = $state('');
	let type: 'info' | 'warning' | 'error' | 'success' = $state('info');
	let visible = $state(true);
	let hideDelay = $state(0);
	let content = $state(
		'Your email address has not been verified. For your security please <a href="https://surveyplanet.com/verify-email"> verify your email</a> address before logging in.'
	);
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<Layout
	component="Banner"
	example={source({ content, title, type, visible, hideDelay })}
	{md}
	bind:events>
	{#snippet controls()}
		<PropsChanger
			label="Title"
			bind:value={title} />
		<PropsChanger
			label="Type"
			bind:value={type}
			selectOptions={['info', 'warning', 'error', 'success']} />
		<PropsChanger
			label="Visible"
			bind:value={visible} />
		<PropsChanger
			label="HideDelay"
			bind:value={hideDelay} />
		<PropsChanger
			label="Content"
			bind:value={content} />
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
