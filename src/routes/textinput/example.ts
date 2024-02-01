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
	return `<script>
	import { TextInput } from '@surveyplanet/svelte_components';

    let id = '${id}';
	let name = '${name}';
	let type: TextInputType = '${type}';
	let value = '${value}';
	let label = '${label}';
	let placeholder = '${placeholder}';
	let readonly =  ${readonly};
	let disabled = ${disabled};
	let cleaveOptions = ${cleaveOptions};
	let validationRules: string[] = ${JSON.stringify(validationRules)};
	let validationMessage = '${validationMessage}';
	let size = '${size}';

	const keyupHandler = (event) => {
		console.log(event.key);
	};
</script>

<TextInput
	on:change={changeHandler}
	on:focus={focusHandler}
	on:keydown={keydownHandler}
	on:keyup={keyupHandler}
	{disabled}
	{readonly}
	{multiline}
	{label}
	{placeholder}
	{type}
	{value}
	{name}
	{id}
	{size}
	{validationRules}
	{validationMessage}
	{cleaveOptions} />
`;
};
