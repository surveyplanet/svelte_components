<script lang="ts">
	let {
		id = (Date.now() + Math.random()).toString(36),
		name,
		value = null,
		label = '',
		checked = false,
		disabled = false,
		prependLabel = false,
		size = 'small',
		onchange,
	} = $props<{
		id?: string;
		name: string;
		value?: string | null;
		label?: string;
		checked?: boolean;
		disabled?: boolean;
		prependLabel?: boolean;
		size?: 'small' | 'medium' | 'large';
		onchange?: (e: Event) => void;
	}>();
</script>

<input
	type="radio"
	class="sp-radio--input"
	{name}
	{id}
	{value}
	{checked}
	{disabled}
	{onchange} />

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
