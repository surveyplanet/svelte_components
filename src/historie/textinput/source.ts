export default `<script>
	import { TextInput } from '@surveyplanet/svelte_components';
	const keyupHandler = (event) => {
		console.log(event.key);
	};
</script>

<TextInput
    on:keyup={keyupHandler}
    type="email"
    name="email"
    placeholder="Email"
    on:keyup={keyupHandler}
    class="sp-input"
    validate="email"
    required

/>
`;
