export default (
	id: string,
	name: string,
	value: string,
	checked: boolean,
	disabled: boolean,
	prependLabel: boolean,
	size: 'small' | 'medium' | 'large'
) => {
	return `<script>
	import Checkbox from '@surveyplanet/svelte_components';
	const changeEventHandler = (event) => {
		console.log("Option $event.value was selected");
	};

	let id = '${id}';
	let name = '${name}';
	let value = '${value}';
	let checked = ${checked};
	let disabled = ${disabled};
	let prependLabel = ${prependLabel};
	let size = '${size}';
	
</script>

<Checkbox
	id="option-1"
	label="Option 1"
	name="option"
	value="one"
	on:change="{changeEventHandler}" />

<Checkbox
	id="option-2"
	label="Option 2"
	name="option2"
	value="two"
	on:change="{changeEventHandler}" />
`;
};
