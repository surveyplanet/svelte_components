<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	// import { validate } from '../../../lib';
	// import * from './validate.test';
</script>

<Meta title="Utilities/Validate" />

<Template let:args>
	<script>
		function changeHandler(e) {
			console.log(e);
			// validate(e.target);
		}
	</script>
	<label for="email">Email</label>
	<input
		onchange="changeHandler(this)"
		type="email"
		id="email"
		name="email"
		data-validate-rules="require,email" />
</Template>

<Story name="Email Validation" />
