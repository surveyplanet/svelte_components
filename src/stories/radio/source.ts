export default `<script>
	import Radio from '@surveyplanet/svelte_components';
	const changeEventHandler = (event) => {
		console.log("Option $event.value was selected");
	};
</script>

<Radio
	id="larry"
	name="stooge"
	value="larry"
	label="Larry"
	checked
	on:change="{changeEventHandler}" />
<Radio
	id="curly"
	name="stooge"
	value="curly"
	label="Curly"
	on:change="{changeEventHandler}" />
<Radio
	id="moe"
	name="stooge"
	value="moe"
	label="Moe"
	on:change="{changeEventHandler}" />
`;
