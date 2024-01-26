<script
	lang="ts"
	context="module">
	export type BannerProps = {
		title?: string;
		type?: 'info' | 'warning' | 'error' | 'success';
		visible?: boolean;
		hideDelay?: number;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { type IconName, Icon } from './index';
	import type { Snippet } from 'svelte';

	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let {
		title = '',
		type = 'success',
		visible = false,
		hideDelay = 0,
		children,
	} = $props<BannerProps>();

	const animParams = {
		y: -250,
		duration: 350,
		easing: cubicOut,
	};

	// $effect(() => {
	let iconName = $state(
		{
			info: 'info',
			warning: 'warning',
			error: 'xSmall',
			success: 'checkSmall',
		}[type] as IconName
	);

	if (visible && hideDelay > 0) {
		setTimeout(() => {
			visible = false;
		}, hideDelay);
	}
	// });
</script>

{#if visible}
	<div
		role="alert"
		class="sp-banner sp-banner--{type}"
		transition:fly={animParams}>
		<div class="sp-banner--icon">
			<div class="sp-banner--icon--wrapper">
				<Icon
					name={iconName}
					size={24} />
			</div>
		</div>

		<div class="sp-banner--content">
			{#if title && title.length}
				<h3 class="sp-banner--title">{title}</h3>
			{/if}
			<p class="sp-banner--content--body">
				{#if children}
					{@render children()}
				{/if}
			</p>
		</div>
	</div>
{/if}
