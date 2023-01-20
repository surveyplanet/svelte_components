<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { COLORS, SIZES, MASCOTS } from './_definitions';

	const dispatch = createEventDispatcher();

	const bgColors = [COLORS.blue, COLORS.green, COLORS.pink, COLORS.yellow];

	const mascots = [
		MASCOTS.marvin,
		MASCOTS.dylan,
		MASCOTS.aaron,
		MASCOTS.jack,
	];

	export let imgSrc: string | null = null;

	export let id: string | null = null;

	export let size: SIZES = SIZES.SMALL;

	export let disabled: boolean = false;
	let role = 'button';

	if (disabled) {
		role = 'presentation';
	}
	const getPersistentIndex = (length: number = 0): number => {
		if (!id || !id.length) {
			return 0;
		}
		const charCode = id.trim().toLowerCase().charCodeAt(0);
		return (charCode % length) as number;
	};

	const getBgColor = (): string => {
		return bgColors[getPersistentIndex(bgColors.length)];
	};

	const getProfileImg = (): string => {
		if (imgSrc && /^https:\/\//.test(imgSrc)) {
			return imgSrc;
		}
		return mascots[getPersistentIndex(mascots.length)];
	};
	const clickHandler = (e: MouseEvent): void => {
		if (disabled) {
			return;
		}
		dispatch('click', e);
	};
</script>

<button
	class="sp-avatar sp-avatar--{size}"
	on:click={clickHandler}
	style:background-color={getBgColor()}
	aria-label="profile avatar"
	{role}>
	<span class="sp-avatar--image">
		<img
			src={getProfileImg()}
			alt="profile" />
	</span>
</button>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.sp-avatar {
		display: inline-flex;
		height: $size--36;
		width: $size--36;
		padding: 0 $size--4;
		text-align: center;
		white-space: nowrap;
		vertical-align: baseline;
		border-radius: 100%;
		border: 0;
		overflow: hidden;
	}
	.sp-avatar:hover {
		cursor: pointer;
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
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		img {
			max-width: 130%;
			height: auto;
		}
	}
</style>
