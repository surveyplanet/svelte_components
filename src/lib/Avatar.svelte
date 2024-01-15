<script
	lang="ts"
	context="module">
	import cubbi from '../assets/mascots/cubbi_1.svg';
	import gruffi from '../assets/mascots/gruffi_1.svg';
	import sunni from '../assets/mascots/sunni_1.svg';
	import tummi from '../assets/mascots/tummi_1.svg';
	import zummi from '../assets/mascots/zummi_1.svg';

	export const MASCOTS = {
		cubbi: cubbi,
		gruffi: gruffi,
		sunni: sunni,
		tummi: tummi,
		zummi: zummi,
	} as Record<string, string>;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatchClick = createEventDispatcher<{
		click: MouseEvent;
	}>();

	// mascot should return a type that is a key of MASCOTS
	const mascots = Object.keys(MASCOTS).map((key) => {
		return MASCOTS[key];
	});

	const bgColors = ['yellow', 'blue', 'pink', 'green'] as const;

	export let profileImage: string;

	export let id: string;

	export let size: 'small' | 'medium' | 'large' = 'medium';

	export let disabled = false;

	let bgColor: (typeof bgColors)[number] = bgColors[0];

	$: {
		if (!/^https?:\/\//.test(profileImage)) {
			profileImage = mascots[getPersistentIndex(mascots.length)];
		}

		if (id?.length) {
			bgColor = bgColors[getPersistentIndex(bgColors.length)];
		}
	}

	const getPersistentIndex = (length = 0): number => {
		if (!id?.length) {
			return 0;
		}
		const idx = id.trim().toLowerCase().charCodeAt(0) % length;

		return idx;
	};

	const clickHandler = (e: MouseEvent): void => {
		if (disabled) {
			return;
		}
		dispatchClick('click', e);
	};
</script>

<button
	class="sp-avatar sp-avatar--{size} sp-avatar--background--{bgColor}"
	on:click|preventDefault={clickHandler}
	aria-label={disabled ? null : 'profile image'}
	role={disabled ? 'presentation' : null}
	{disabled}>
	<div
		class="sp-avatar--image"
		class:sp-avatar--image--profile={/^https?:\/\//.test(profileImage)}>
		<img
			src={profileImage}
			alt="profile" />
	</div>
</button>
