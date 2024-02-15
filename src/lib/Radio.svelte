<script
	lang="ts"
	context="module">
	export type RadioProps = {
		id?: string;
		name?: string;
		value?: string | null;
		label?: string;
		checked?: boolean;
		disabled?: boolean;
		prependLabel?: boolean;
		size?: 'small' | 'medium' | 'large';
		onRadioChange?: (event: ComponentEvent<boolean>) => void;
	};
</script>

<script lang="ts">
	import { ComponentEvent } from '$lib';
	let {
		id,
		name,
		value,
		label,
		checked,
		disabled,
		prependLabel,
		size = 'small', // small is the most common size
		onRadioChange,
	} = $props<RadioProps>();

	const ratioChangeHandler = (event: Event) => {
		if (typeof onRadioChange === 'function') {
			const componentEvent = new ComponentEvent(
				(event.target as HTMLInputElement).checked,
				event.target!,
				event
			);
			onRadioChange(componentEvent);
		}
	};
</script>

<input
	type="radio"
	class="sp-radio--input"
	{name}
	{id}
	{value}
	{checked}
	{disabled}
	onchange={ratioChangeHandler} />

<label
	class="sp-radio sp-radio--{size}"
	class:sp-radio--prepend={prependLabel}
	for={id}>
	<span class="sp-radio--dot">
		<svg
			width="16px"
			height="16px"
			viewBox="0 0 16 16">
			<circle
				cx="8"
				cy="8"
				r="50%" />
		</svg>
	</span>
	<span class="sp-radio--label">{label}</span>
</label>
