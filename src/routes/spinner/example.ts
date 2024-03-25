import type { SpinnerProps } from '$lib';

export default (data: SpinnerProps) => {
	return `
<script lang="ts">
	import { Spinner } from '@surveyplanet/svelte-components';
	const onSpinnerChange = (event: ComponentEvent<number | undefined>) => {
		console.log(value);
	};
	const onSpinnerUpdate = (event: ComponentEvent<number | undefined>) => {
		console.log(value);
	};
	const onSpinnerInput = (event: ComponentEvent<number | undefined>) => {
		console.log(value);
	};
	const onSpinnerBlur = (event: ComponentEvent<undefined>) => {
		console.log('blur');
	}
	const onSpinnerFocus = (event: ComponentEvent<undefined>) => {
		console.log('focus');
	}
</script>

<Spinner
	label='${data.label}'
	step={${data.step}}
	min={${data.min}}
	max={${data.max}}
	value={${data.value}}
	disabled={${data.disabled}}
	required={${data.required}}
	overflow={${data.overflow}}
	id='${data.id}'
	placeholder='${data.placeholder}'
	dragSpeed={${data.dragSpeed}}
	size='${data.size}'
	{onSpinnerChange}
	{onSpinnerUpdate}
	{onSpinnerInput}
	{onSpinnerBlur}
	{onSpinnerFocus}
/>
`;
};
