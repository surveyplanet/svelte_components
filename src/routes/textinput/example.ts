// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-base-to-string */
import type { TextInputProps } from '$lib';
export default (
	data: TextInputProps
) => {
	return `
<script lang='ts'>
	import { TextInput } from '@surveyplanet/svelte_components';
	const onTextInputInput = (value: string) => {
		console.log(value);
	}
	const onTextInputBlur = () => {
		console.log('blur');
	}
	const onTextInputChange = (value: string) => {
		console.log(value);
	}
	const onTextInputFocus = () => {
		console.log('focus');
	}
	const onTextInputKeydown = (event: KeyboardEvent) => {
		console.log(event);
	}
	const onTextInputKeyup = (event: KeyboardEvent) => {
		console.log(event);
	}
</script>

<TextInput
	{onTextInputInput}
	{onTextInputBlur}
	{onTextInputChange}
	{onTextInputFocus}
	{onTextInputKeydown}
	{onTextInputKeyup}
	id='${data.id}'
	name='${data.name}'
	type='${data.type}'
	value='${data.value}'
	label='${data.label}'
	placeholder='${data.placeholder}'
	readonly={${data.readonly}}
	disabled={${data.disabled}}
	cleaveOptions={${data.cleaveOptions}}
	validationRules={${JSON.stringify(data.validationRules)}}
	validationMessage='${data.validationMessage}'
	size='${data.size}'
/>
`;
};
