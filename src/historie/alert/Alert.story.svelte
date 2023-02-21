<script lang="ts">
	import { logEvent } from 'histoire/client';
	import { Alert } from '../../lib';

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

	const source = `<Badge {bgColor} {textColor}>{content}</Badge>`;
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
		title="Badge component"
		{source}>
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
	</Hst.Variant>
</Hst.Story>

<!--
<Story
	name="Default"
	args={{
		title: 'Did you know?',
		subtitle: 'Informational alert',
		type: 'info',
	}}
	play={test.primary} />

<Story
	name="Close"
	let:args
	args={{
		title: 'Close Test',
		type: 'info',
	}}
	play={test.close} />

<Story
	name="Confirm"
	let:args
	args={{
		confirm: true,
		hideDelay: 1000, // make sure this doesn't automatically hide
		title: 'Permanently delete',
		subtitle: 'This cannot be undone.',
		type: 'warning',
		confirmButtonLabel: 'Confirm',
	}}
	play={test.confirm} />

<Story
	name="Challenge"
	let:args
	args={{
		confirm: true,
		title: 'Delete account',
		subtitle:
			'If you want to delete your account enter your email address below',
		type: 'success',
		confirmButtonLabel: 'Yes, delete',
		cancelButtonLabel: 'No, cancel',
		challengeLabel: 'Enter your email address',
		challenge: 'testing@example.com',
	}}
	play={test.challenge} />

<Story
	name="Challenge"
	let:args
	play={test.challenge}>
</Story>

<Story
	name="Hidden Delay"
	args={{
		hideDelay: 1000,
		title: 'Hidden Delay',
		type: 'warning',
	}}
	play={test.delayHide} />

<Story
	name="HTML content"
	let:args
	play={test.html}>
	<Alert
		{...args}
		title="HTML"
		type="error"
		subtitle="Subtitle of the alert">
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
</Story> -->
