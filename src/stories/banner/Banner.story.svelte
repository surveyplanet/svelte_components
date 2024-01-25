<script lang="ts">
	import { logEvent } from 'histoire/client';
	import type { Hst as Histoire } from '@histoire/plugin-svelte';
	import { Banner } from '$lib';
	import { default as source } from './source';

	export let Hst: Histoire;

	let title = '';
	let type: 'info' | 'warning' | 'error' | 'success' = 'info';
	let visible = true;
	let hideDelay = 0;
	let content =
		'Your email address has not been verified. For your security please <a href="https://surveyplanet.com/verify-email"> verify your email</a> address before logging in.';
</script>

<Hst.Story>
	<svelte:fragment slot="controls">
		<Hst.Select
			bind:value={type}
			title="Type"
			options={[
				{ label: 'Info', value: 'info' },
				{ label: 'Warning', value: 'warning' },
				{ label: 'Error', value: 'error' },
				{ label: 'Success', value: 'success' },
			]} />

		<Hst.Text
			bind:value={title}
			title="Title" />
		<Hst.Checkbox
			bind:value={visible}
			title="Visible" />
		<Hst.Number
			bind:value={hideDelay}
			title="Hide delay" />
		<Hst.Textarea
			bind:value={content}
			title="Content" />
	</svelte:fragment>

	<Hst.Variant
		title="Banner"
		source={source(content, title, type, visible, hideDelay)}>
		<div class="banner-wrapper">
			<Banner
				{title}
				{type}
				{visible}
				{hideDelay}>{@html content}</Banner>
		</div>
	</Hst.Variant>
</Hst.Story>

<style>
	.banner-wrapper {
		padding: 50px;
	}
</style>
