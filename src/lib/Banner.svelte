<script lang="ts">
	import { type IconName, Icon } from './index';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	export let title = '';

	export let type: 'info' | 'warning' | 'error' | 'success' = 'success';

	export let visible = false;

	/**
	 * Automatically hide alert after X milliseconds. A value of 0 means don't hide.
	 */
	export let hideDelay = 0;

	const animParams = {
		y: -250,
		duration: 350,
		easing: cubicOut,
	};

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
			<p class="sp-banner--content--body"><slot /></p>
		</div>
	</div>
{/if}
