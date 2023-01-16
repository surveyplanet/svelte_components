<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { COLORS } from './_definitions';

	const color = (email: string) => {
		const colors = [
			COLORS.blue_light,
			COLORS.green,
			COLORS.pink_light,
			COLORS.yellow_light,
		];
		const sum = email
			.split('')
			.reduce((acc, char) => acc + char.charCodeAt(0), 0);
		return colors[sum % colors.length];
	};
	export let email: string = 'ogi@surveyplanet.com';
	export let size: 'small' | 'medium' | 'large' = 'small';

	export const bgColor = color(email);
	const clickHandler = (e: MouseEvent): void => {
		dispatch('clickEvent', e);
	};
</script>

<button
	class="sp-avatar sp-avatar--{size}"
	style:background-color={bgColor}
	on:click={clickHandler}>
	<slot class="img" />
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
	.img {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
