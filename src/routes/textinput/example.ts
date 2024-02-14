import type { TextInputProps } from '$lib';
export default (
	data: TextInputProps
) => {
	return `
<script lang="ts">
	import { TextInput, type TextInputProps } from '@surveyplanet/svelte_components';

	const onTextInputInput = (e: Event) => {
		console.log(e);
	}
	const onTextInputBlur = () => {
		console.log('blur');
	}
	const onTextInputChange = (e: Event) => {
		console.log(e);
	}
	const onTextInputFocus = () => {
		console.log('focus');
	}
	const onTextInputKeydown = (e: Event) => {
		console.log(e);
	}
	const onTextInputKeyup = (e: Event) => {
		console.log(e);
	}

	let validationRules: TextInputProps['validationRules']  = ${JSON.stringify(data.validationRules, null, 2)};
	let cleaveOptions: TextInputProps['cleaveOptions'] = ${JSON.stringify(data.cleaveOptions, null, 2)};

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
	{cleaveOptions}
	{validationRules}
	validationMessage=''
	size='${data.size}'
/>
`;
};
