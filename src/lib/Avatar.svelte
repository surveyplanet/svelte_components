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
	const setOptions = (email: string | undefined) => {
		if (!email) {
			return [COLORS.blue, MASCOTS.aaron];
		}

		const charCode = email.trim().toLowerCase().charCodeAt(0);
		return [
			bgColorOptions[charCode % bgColorOptions.length],
			mascots[charCode % mascots.length],
		];
	};

	export let imgSrc: string | undefined;

	export let email: string | undefined;
	export let size: SIZES = SIZES.SMALL;
	export const options = setOptions(email);
	const dispatch = createEventDispatcher();
	const clickHandler = (e: MouseEvent): void => {
		dispatch('clickEvent', e);
	};
</script>

<button
	class="sp-avatar sp-avatar--{size}"
	on:click={clickHandler}
	style:background-color={options[0]}>
	<span class="sp-avatar--image">
		{#if imgSrc === undefined || imgSrc === null || imgSrc.length === 0}
			<img
				src={options[1]}
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
	}
</style>
