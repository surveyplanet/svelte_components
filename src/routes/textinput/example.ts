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

	const keyupHandler = (event) => {
		console.log(event.key);
	};

</script>

<TextInput
	onChange={changeHandler}
	onFocus={focusHandler}
	onkeydown={keydownHandler}
	onKeyup={keyupHandler}
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
