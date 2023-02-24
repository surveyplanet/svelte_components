export default `<script>
	import Checkbox from '@surveyplanet/svelte_components';
	const changeEventHandler = (event) => {
		console.log("Option $event.value was selected");
	};
</script>

<Checkbox
	type="radio"
	id="option-1"
	label="Option 1"
	value="one"
	attr="{{data-random:math.random()}}"
	on:change="{changeEventHandler}" />

<Checkbox
	type="radio"
	id="option-2"
	label="Option 2"
	value="two"
	on:change="{changeEventHandler}" />
`;
