<script
	lang="ts"
	context="module">
	export type CheckboxProps = {
		id?: string;
		name: string;
		value?: string | null;
		label?: string;
		checked?: boolean;
		disabled?: boolean;
		prependLabel?: boolean;
		size: 'small' | 'medium' | 'large';
		onchange?: (e: Event) => void;
	};
</script>

<script lang="ts">
	let {
		id = (Date.now() + Math.random()).toString(36),
		name,
		value = null,
		label = '',
		checked,
		disabled = false,
		prependLabel = false,
		size = 'small',
		onchange,
	} = $props<CheckboxProps>();
</script>

<input
	type="checkbox"
	class="sp-checkbox--input"
	{id}
	{name}
	{value}
	bind:checked
	{disabled}
	{onchange} />
<label
	class="sp-checkbox sp-checkbox--{size}"
	class:sp-checkbox--prepend={prependLabel}
	for={id}>
	<span class="sp-checkbox--check">
		<svg
			width="12px"
			height="9px"
			viewBox="0 0 12 9">
			<polyline points="1 5 4 8 11 1" />
		</svg>
	</span>
	<span class="sp-checkbox--label">{label}</span>
</label>
