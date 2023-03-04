export default `<script>
	import { Form, TextInput, Button } from '@surveyplanet/svelte_components';
	const keyupHandler = (event) => {
		console.log(event.key);
	};
</script>

<Form
    {id}
    {attr}>
    <TextInput
        type="text"
        name="name"
        placeholder="Name"
        on:keyup={keyupHandler}
        class="sp-input"
        required />
    <TextInput
        type="email"
        name="email"
        placeholder="Email"
        on:keyup={keyupHandler}
        class="sp-input"
        required />
    <TextInput
        type="password"
        name="password"
        placeholder="Password"
        on:keyup={keyupHandler}
        class="sp-input"
        required />
        <Checkbox
            name="terms"
            label="I agree to the terms and conditions"
            on:keyup={keyupHandler}
            class="sp-input"
            required />
    <Button
        type="submit"
        label="Submit"
        class="sp-button" />
</Form>`;
