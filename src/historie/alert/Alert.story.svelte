<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { Alert } from '../../lib';
	import { default as source } from './source';

	export let Hst;

	let title = 'Did you know?';
	let subtitle = 'Informational alert';
	let type = 'info';
	let hideDelay = 0;
	let confirm = false;
	let confirmButtonLabel = 'Confirm';
	let cancelButtonLabel = 'Cancel';
	let challenge: string;
	let content = '';

	const openHandler = (e: Event) => {
		logEvent('open', e);
	};
	const inHandler = (e: Event) => {
		logEvent('in', e);
	};
	const closeHandler = (e: Event) => {
		logEvent('close', e);
	};
	const outHandler = (e: Event) => {
		logEvent('out', e);
	};
	const confirmHandler = (e: Event) => {
		logEvent('confirm', e);
	};
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
		<Hst.Text
			bind:value={subtitle}
			title="Subtitle" />
		<Hst.Number
			bind:value={hideDelay}
			step="1"
			title="Hide delay" />
		<Hst.Checkbox
			bind:value={confirm}
			title="Confirm" />
		<Hst.Text
			bind:value={confirmButtonLabel}
			title="Confirm button label" />
		<Hst.Text
			bind:value={cancelButtonLabel}
			title="Cancel button label" />
		<Hst.Text
			bind:value={challenge}
			title="Challenge" />
		<Hst.Text
			bind:value={content}
			title="Content" />
	</svelte:fragment>

	<Hst.Variant
		title="Basic"
		{source}>
		<div class="alert-wrapper">
			<Alert
				on:open={openHandler}
				on:in={inHandler}
				on:close={closeHandler}
				on:out={outHandler}
				on:confirm={confirmHandler}
				{title}
				{subtitle}
				{type}
				{hideDelay}
				{confirm}
				{confirmButtonLabel}
				{cancelButtonLabel}
				{challenge}>{content}</Alert>
		</div>
	</Hst.Variant>

	<!-- <Hst.Variant
		title="Confirmation"
		{source}>
		<div class="alert-wrapper">
			<Alert
				on:open={openHandler}
				on:in={inHandler}
				on:close={closeHandler}
				on:out={outHandler}
				on:confirm={confirmHandler}
				confirm={true}
				title="Delete account"
				subtitle="If you want to delete your account enter your email address below."
				type="warning"
				confirmButtonLabel="Yes, delete"
				cancelButtonLabel="No, cancel"
				challengeLabel="Enter your email address"
				challenge="testing@example.com" />
		</div>
	</Hst.Variant>

	<Hst.Variant
		title="HTML content"
		{source}>
		<div class="alert-wrapper">
			<Alert
				on:open={openHandler}
				on:in={inHandler}
				on:close={closeHandler}
				on:out={outHandler}
				on:confirm={confirmHandler}
				{title}
				{subtitle}
				{type}
				{hideDelay}
				{confirm}
				{confirmButtonLabel}
				{cancelButtonLabel}
				{challenge}>
				<h4>Some HTML content</h4>
				<p>
					Had upon could his clay <a
						href="/"
						data-testid="test-link">misery</a> run friends but caught.
				</p>
				<img
					data-testid="test-img"
					src="https://via.placeholder.com/256/00FF00/FFFFFF?text=Test%20Image"
					alt="test" />
			</Alert>
		</div>
	</Hst.Variant> -->
</Hst.Story>

<style>
	.alert-wrapper {
		padding: 50px;
	}
</style>
