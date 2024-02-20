<script
	lang="ts"
	context="module">
	import type { HTMLAttributes } from 'svelte/elements';
	export type BannerProps = HTMLAttributes<HTMLDivElement> & {
		title?: string;
		type?: 'info' | 'warning' | 'error' | 'success';
		visible?: boolean;
		hideDelay?: number;
		children?: Snippet;
	};
</script>

<script lang="ts">
	import { type IconName, Icon } from './';
	import type { Snippet } from 'svelte';

	import { slide, fade } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';

	let {
		title,
		type = 'success',
		visible,
		hideDelay = 0, // when default is 0, it will not hide which is a default behavior
		children,
		...attr
	} = $props<BannerProps>();

	let animDuration = 250;

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
</script>

{#if visible}
	<div
		{...attr}
		role="alert"
		class="sp-banner sp-banner--{type}"
		in:slide={{ duration: animDuration, axis: 'y', easing: sineOut }}
		out:slide={{
			delay: animDuration * 0.5,
			duration: animDuration,
			axis: 'y',
			easing: sineOut,
		}}>
		<div class="sp-banner--icon">
			<div
				class="sp-banner--icon--wrapper"
				in:fade={{
					delay: animDuration * 0.5,
					duration: animDuration,
					easing: sineOut,
				}}
				out:fade={{ duration: animDuration, easing: sineOut }}>
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
