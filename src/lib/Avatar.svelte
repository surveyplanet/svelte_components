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

	export type AvatarProps = {
		profileImage: string;
		id?: string;
		size?: 'small' | 'medium' | 'large';
		disabled?: boolean;
		onAvatarClick?: (e: MouseEvent) => void;
	};
</script>

<script lang="ts">
	let { profileImage, id, size, disabled, onAvatarClick } =
		$props<AvatarProps>();

	// mascot should return a type that is a key of MASCOTS
	const mascots = Object.keys(MASCOTS).map((key) => {
		return MASCOTS[key];
	});

	const bgColors = ['yellow', 'blue', 'pink', 'green'] as const;

	let bgColor: (typeof bgColors)[number] = $state(bgColors[0]);

	$effect(() => {
		if (!/^https?:\/\//.test(profileImage)) {
			profileImage = mascots[getPersistentIndex(mascots.length)];
		}

		if (id?.length) {
			bgColor = bgColors[getPersistentIndex(bgColors.length)];
		}
	});

	const getPersistentIndex = (length = 0): number => {
		if (!id?.length) {
			return 0;
		}
		const idx = id.trim().toLowerCase().charCodeAt(0) % length;

		return idx;
	};

	function avatarClickHandler(e: MouseEvent): void {
		e.preventDefault();

		if (disabled) {
			return;
		}

		if (typeof onAvatarClick === 'function') {
			onAvatarClick(e);
		}
	}
</script>

<button
	class="sp-avatar sp-avatar--{size} sp-avatar--background--{bgColor}"
	onclick={avatarClickHandler}
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
