<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { COLORS, SIZES, MASCOTS } from './_definitions';

	const bgColorOptions = [
		COLORS.blue,
		COLORS.green,
		COLORS.pink,
		COLORS.yellow,
	];

	const mascots = [
		MASCOTS.marvin,
		MASCOTS.dylan,
		MASCOTS.aaron,
		MASCOTS.jack,
	];

	const setBgColor = (email: string | undefined) => {
		if (!email) {
			return COLORS.blue;
		}

		const charCode = email.trim().toLowerCase().charCodeAt(0);
		return bgColorOptions[charCode % bgColorOptions.length];
	};

	const setPlaceholderImage = (email: string | undefined) => {
		if (!email) {
			return MASCOTS.aaron;
		}

		const charCode = email.trim().toLowerCase().charCodeAt(0);
		return mascots[charCode % mascots.length];
	};

	export let imgSrc: string | undefined;

	export let email: string | undefined;

	export let size: SIZES = SIZES.SMALL;

	export const bgColor = setBgColor(email);

	export const placeholderImage = setPlaceholderImage(email);

	const dispatch = createEventDispatcher();

	const clickHandler = (e: MouseEvent): void => {
		dispatch('clickEvent', e);
	};
</script>

<button
	class="sp-avatar sp-avatar--{size}"
	style:background-color={bgColor}
	on:click={clickHandler}>
	<span class="sp-avatar--image">
		{#if imgSrc === undefined || imgSrc === null || imgSrc.length === 0}
			<img
				src={placeholderImage}
				alt="placeholder" />
		{:else}
			<img
				src={imgSrc}
				alt={email} />
		{/if}
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
