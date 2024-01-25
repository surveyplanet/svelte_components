<script lang="ts">
	import { Banner } from '$lib';
	import { Layout, PropsContainer, PropsChanger } from '$layout/layout_index';
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
		<PropsContainer>
			<PropsChanger
				text="title"
				value={title}
				oninput={(e: Event) => {
                    title = (e.target as HTMLInputElement).value;
                }} />
			<PropsChanger
				select="type"
				value={type}
				selectOptions={['info', 'warning', 'error', 'success']}
				oninput={(e: Event) => {
                    type = (e.target as HTMLInputElement).value as 'info' | 'warning' | 'error' | 'success';
                }} />
			<PropsChanger
				boolean="visible"
				value={visible}
				oninput={(e: Event) => {
                    visible = (e.target as HTMLInputElement).checked;
                }} />
			<PropsChanger
				number="hideDelay"
				value={hideDelay}
				oninput={(e: Event) => {
                    hideDelay = Number((e.target as HTMLInputElement).value);
                }} />
			<PropsChanger
				text="content"
				value={content}
				oninput={(e: Event) => {
                    content = (e.target as HTMLInputElement).value;
                }} />
		</PropsContainer>
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
