<script lang="ts">
	import { type IconName, Icon } from './index';
	import { slide, fade } from 'svelte/transition';
	import { sineOut } from 'svelte/easing';

	export let title = '';

	export let type: 'info' | 'warning' | 'error' | 'success' = 'success';

	export let visible = false;

	/**
	 * Automatically hide alert after X milliseconds. A value of 0 means don't hide.
	 */
	export let hideDelay = 0;

	let animDuration = 250;

	let iconName: IconName;

	$: {
		iconName = {
			info: 'info',
			warning: 'warning',
			error: 'xSmall',
			success: 'checkSmall',
		}[type] as IconName;

		if (visible && hideDelay > 0) {
			setTimeout(() => {
				visible = false;
			}, hideDelay);
		}
	}
</script>

{#if visible}
	<div
		role="alert"
		class="sp-banner sp-banner--{type}"
		in:slide={{ duration: animDuration, axis: 'y', easing: sineOut }}
		out:slide={{ delay: animDuration*.5, duration: animDuration, axis: 'y', easing: sineOut }}
		>
		<div class="sp-banner--icon" >
			<div class="sp-banner--icon--wrapper" 
				in:fade={{ delay: animDuration*.5, duration: animDuration, easing: sineOut }}
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
			<p class="sp-banner--content--body"><slot /></p>
		</div>
	</div>
{/if}
