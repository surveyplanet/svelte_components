export default `<script>
	import Checkbox from '@surveyplanet/svelte_components';
	const changeEventHandler = (event) => {
		console.log("Option $event.value was selected");
	};
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
