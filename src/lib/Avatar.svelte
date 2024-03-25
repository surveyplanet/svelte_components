<script
	lang="ts"
	context="module">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	export type AvatarProps = HTMLButtonAttributes & {
		label?: string;
		profileImage?: string;
		userId?: string;
		size?: 'small' | 'medium' | 'large';
		disabled?: boolean;
		onAvatarClick?: (
			event: ComponentEvent<undefined, HTMLButtonElement>
		) => void;
	};
</script>

<script lang="ts">
	import { transformImage } from '@surveyplanet/utilities';
	import { ComponentEvent } from './';
	// import { onMount } from 'svelte';

	let {
		profileImage,
		userId,
		size = 'small',
		disabled,
		onAvatarClick,
		...attr
	}: AvatarProps = $props();

	const MASCOT_NAMES = [
		'cubbi',
		'gruffi',
		'sunni',
		'tummi',
		'zummi',
	] as const;

	const BG_COLORS = ['yellow', 'blue', 'pink', 'green'] as const;

	let bgColor: (typeof BG_COLORS)[number] = $state(BG_COLORS[0]);
	let mascot: (typeof MASCOT_NAMES)[number] = $state(MASCOT_NAMES[0]);
	let profileImageSize: number = $state(72); // small is default

	const isValidProfileImage = (): boolean => {
		return (
			Object.prototype.toString.call(profileImage) ===
				'[object String]' && profileImage!.startsWith('http')
		);
	};

	const getPersistentIndex = (length = 0): number => {
		if (!userId?.length) {
			return 0;
		}
		const idx = userId.trim().toLowerCase().charCodeAt(0) % length;

		return idx;
	};

	// onMount(async () => {
	// 	profileImage = await loadProfileImage();
	// });

	const loadProfileImage = async (): Promise<string> => {
		let src = '';

		if (isValidProfileImage()) {
			src = await transformImage(profileImage!, {
				width: profileImageSize,
				height: profileImageSize,
				fit: 'cover',
			});
		} else {
			src = `https://public.surveyplanet.com/images/mascots/${mascot}_1.svg`;
		}

		return new Promise((resolve, reject) => {
			const img = new Image();
			img.src = src;
			img.onerror = reject;
			img.onload = async () => {
				return resolve(src);
			};
		});
	};

	$effect.pre(() => {
		mascot = MASCOT_NAMES[getPersistentIndex(MASCOT_NAMES.length)];
		bgColor = BG_COLORS[getPersistentIndex(BG_COLORS.length)];

		// double the size for retina displays
		if (size === 'small') {
			profileImageSize = 36 * 2;
		} else if (size === 'medium') {
			profileImageSize = 48 * 2;
		} else if (size === 'large') {
			profileImageSize = 64 * 2;
		}
	});

	function avatarClickHandler(event: MouseEvent): void {
		event.preventDefault();

		if (disabled) {
			return;
		}

		if (typeof onAvatarClick === 'function') {
			const componentEvent = new ComponentEvent(
				undefined,
				event.target as HTMLButtonElement,
				event
			);
			onAvatarClick(componentEvent);
		}
	}
</script>

<!-- eslint-disable svelte/no-at-html-tags -->

<svelte:element
	this={disabled ? 'div' : 'button'}
	{...attr}
	class="sp-avatar sp-avatar--{size} sp-avatar--background--{bgColor}"
	onclick={avatarClickHandler}
	aria-label={disabled ? null : 'profile image'}
	role={disabled ? 'presentation' : null}>
	{#await loadProfileImage() then image}
		<div
			class="sp-avatar--image {isValidProfileImage()
				? 'sp-avatar--image--profile'
				: `sp-avatar--image--mascot-${mascot}`}">
			<img
				src={image}
				alt="profile" />
		</div>
	{/await}
</svelte:element>
