import type { TextInputProps } from '$lib';
export default (
	data: TextInputProps
) => {
	return `
<script lang="ts">
	import { TextInput, type TextInputProps } from '@surveyplanet/svelte_components';

	const onTextInputInput = (event: ComponentEvent<string>) => {
		console.log(event);
	}
	
	const onTextInputChange = (event: ComponentEvent<string>) => {
		console.log(event);
	}
	
	const onTextInputKeydown = (event: ComponentEvent<string>) => {
		console.log(event);
	}
	const onTextInputKeyup = (event: ComponentEvent<string>) => {
		console.log(event);
	}
	const onTextInputFocus = (event: ComponentEvent<undefined>) => {
		console.log('focus');
	}
	const onTextInputBlur = (event: ComponentEvent<undefined>) => {
		console.log('blur');
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
