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
	import { Button, BUTTON_MODES } from '@surveyplanet/svelte-components';
	const clickHandler = () => {
		console.log('Button clicked');
	};
</script>


<Button
	mode={BUTTON_MODES['${mode}']}
	disabled=${disabled}
	loader=${loader}
	round=${round}
	block=${block}
	action=${action}
	type='${type}'
	size='${size}' 
	onClick={clickHandler}>
	${content}
</Button>
`;
};
