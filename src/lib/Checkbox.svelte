<script
	lang="ts"
	context="module">
	import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

	export type CheckboxData = {
		label: string;
	} & HTMLInputAttributes;

	export type CheckboxProps = {
		data: CheckboxData | CheckboxData[];
		group?: string[];
		size?: 'small' | 'medium' | 'large';
		prependLabel?: boolean;
		block?: boolean;
		onCheckboxChange?: (
			event: ComponentEvent<string[], HTMLInputElement>
		) => void;
	} & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	// import { tick } from 'svelte';
	import { ComponentEvent } from './';
	import { omitProps, delay, uniqueId } from '@surveyplanet/utilities';

	let {
		data,
		group = [], // TODO: no default value since it's bound to the input checked attribute
		size = 'small',
		prependLabel,
		block,
		onCheckboxChange,
		...attr
	} = $props<CheckboxProps>();

	const checkboxChangeHandler = async (event: Event): Promise<void> => {
		if (typeof onCheckboxChange === 'function') {
			await delay(); // wait one cycle of event loop for 'group' to update
			const eventTarget = event.target as HTMLInputElement;

			const componentEvent = new ComponentEvent(
				group,
				eventTarget,
				event
			);
			onCheckboxChange(componentEvent);
		}
	};

	$effect.pre(() => {
		if (typeof data === 'object' && !Array.isArray(data)) {
			data = [data];
		}

		// make sure each item has an id
		data = data.map((item) => {
			item.id = item.id || uniqueId();
			return item;
		});
	});
</script>

<div
	class="sp-form-control sp-checkbox--group"
	class:sp-checkbox--block={block}
	{...attr}>
	{#if Array.isArray(data) && data.length}
		{#each data as item}
			<div class="sp-checkbox">
				<input
					type="checkbox"
					class="sp-checkbox--input"
					id={item.id}
					value={item.value}
					disabled={item.disabled}
					bind:group
					{...omitProps(item, ['label', 'id'])}
					onchange={checkboxChangeHandler} />

				<label
					class="sp-checkbox--item sp-checkbox--{size}"
					class:sp-checkbox--prepend={prependLabel}
					for={item.id}>
					<span class="sp-checkbox--check">
						<svg
							width="12px"
							height="9px"
							viewBox="0 0 12 9">
							<polyline points="1 5 4 8 11 1" />
						</svg>
					</span>
					<span class="sp-checkbox--label">{item.label}</span>
				</label>
			</div>
		{/each}
	{/if}
</div>
