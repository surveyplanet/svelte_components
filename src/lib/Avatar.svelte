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
	on:click={clickHandler}
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

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-avatar {
		margin: 0;
		padding: 0;
		display: inline-flex;
		height: $size--36;
		width: $size--36;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: 100%;
		border: 0;
		overflow: hidden;
		background: $color--gradient--yellow;

		&:hover {
			cursor: pointer;
		}

		@include set-focus {
			border: 1px solid $color--dark;
		}

		&.sp-avatar--background--yellow {
			background: $color--gradient--yellow;
		}

		&.sp-avatar--background--blue {
			background: $color--gradient--blue;
		}

		&.sp-avatar--background--pink {
			background: $color--gradient--pink;
		}

		&.sp-avatar--background--green {
			background: $color--gradient--green;
		}
	}
	.sp-avatar--medium {
		height: $size--48;
		width: $size--48;
	}
	.sp-avatar--large {
		height: $size--64;
		width: $size--64;
	}
	.sp-avatar--image {
		display: flex; // inline-flex
		justify-content: center; // flex-end | center | space-between | space-around | space-evenly | start | end | left | right ... + safe | unsafe;
		align-items: center; // flex-start | flex-end | center | baseline | first baseline | last baseline | start | end | self-start | self-end + ... safe | unsafe;
		width: 100%;
		height: 100%;
		img {
			height: 80%;
			width: 80%;
		}
		// make images full size
		&.sp-avatar--image--profile {
			img {
				height: 100%;
				width: 100%;
				object-fit: cover;
			}
		}
	}
</style>
