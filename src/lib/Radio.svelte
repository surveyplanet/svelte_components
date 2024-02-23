<script
	lang="ts"
	context="module">
	import type { HTMLAttributes, HTMLInputAttributes } from 'svelte/elements';

	export type RadioData = {
		label: string;
	} & HTMLInputAttributes;

	export type RadioProps = {
		data: RadioData | RadioData[];
		group?: string;
		size?: 'small' | 'medium' | 'large';
		prependLabel?: boolean;
		block?: boolean;
		onRadioChange?: (
			event: ComponentEvent<string, HTMLInputElement>
		) => void;
	} & HTMLAttributes<HTMLDivElement>;
</script>

<script lang="ts">
	import { ComponentEvent } from '$lib';
	import { omitProps, uniqueId } from '@surveyplanet/utilities';
	let {
		data,
		group, // no default value since it's bound to the input checked attribute
		size = 'small', // small is the most common size
		prependLabel,
		block,
		onRadioChange,
		...attr
	} = $props<RadioProps>();

	const ratioChangeHandler = (event: Event) => {
		if (typeof onRadioChange === 'function') {
			const eventTarget = event.target as HTMLInputElement;

			const componentEvent = new ComponentEvent(
				eventTarget.value,
				eventTarget,
				event
			);
			onRadioChange(componentEvent);
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
	class="sp-form-control sp-radio--group"
	class:sp-checkbox--block={block}
	{...attr}>
	{#if Array.isArray(data) && data.length}
		{#each data as item}
			<div class="sp-radio">
				<input
					type="radio"
					class="sp-radio--input"
					value={item.value}
					disabled={item.disabled}
					id={item.id}
					bind:group
					{...omitProps(item, ['label', 'id'])}
					onchange={ratioChangeHandler} />

				<label
					class="sp-radio--item sp-radio--{size}"
					class:sp-radio--prepend={prependLabel}
					for={item.id}>
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
					<span class="sp-radio--label">{item.label}</span>
				</label>
			</div>
		{/each}
	{/if}
</div>
