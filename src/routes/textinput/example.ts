// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-base-to-string */
import type { TextInputType } from '$lib';
export default (
	id: string,
	name: string,
	type: TextInputType,
	value: string,
	label: string,
	placeholder: string,
	readonly: boolean,
	disabled: boolean,
	cleaveOptions: object,
	validationRules: string[],
	validationMessage: string,
	size: 'small' | 'medium' | 'large'
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
	id='${id}'
	name='${name}'
	type='${type}'
	value='${value}'
	label='${label}'
	placeholder='${placeholder}'
	readonly={${readonly}}
	disabled={${disabled}}
	cleaveOptions={${cleaveOptions}}
	validationRules={${JSON.stringify(validationRules)}}
	validationMessage='${validationMessage}'
	size='${size}'
/>
`;
};
