export default (
	content: string,
	mode: string,
	disabled: boolean,
	loader: boolean,
	round: boolean,
	block: boolean,
	action: boolean,
	type: 'button' | 'submit' | 'reset',
	size: 'small' | 'medium' | 'large'
) => {
	return `
<script>
	import { Button, type BUTTON_MODES } from '@surveyplanet/svelte-components';

	let content = '${content}';
	let mode = '${mode}';
	let disabled = ${disabled};
	let loader = ${loader};
	let round = ${round};
	let block = ${block};
	let action = ${action};
	let type: ${type};
	let size: ${size};


</script>


<Button
	on:click={clickHandler}
	{mode}
	{disabled}
	{loader}
	{round}
	{block}
	{action}
	{type}
	{size}
	> ${content}
</Button>
`;
};
