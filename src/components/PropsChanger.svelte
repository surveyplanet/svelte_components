<script lang="ts">
	import Checkbox from '$lib/Checkbox.svelte';
	import TextInput from '$lib/TextInput.svelte';
	let {
		text,
		number,
		checkbox,
		object,
		select,
		onInput,
		onBlur,
		selectOptions = [],
		value,
		label = '',
	} = $props<{
		text?: boolean;
		number?: boolean;
		checkbox?: boolean;
		object?: boolean;
		select?: boolean;
		selectOptions?: string[] | number[];
		onInput?: (e: Event) => void;
		onBlur?: (e: Event) => void;
		value?: string | number | boolean | null;
		label?: string;
	}>();

	/**
	 * 
	INFO: 
	 when binding JSON.stringify(data) to the PropsChanger, instead make a new variable that is a stringified version of the data and use
	 effect to parse it into the data variable. TAlso make sure to bind:data in the component. 
	Example: 
	 <script lang="ts">
	 	let data: BreadcrumbData[] = $state([ .... ]);
	
	 	let dataString = $state(JSON.stringify(data)); // <--- this is the new variable
	 	$effect(() => {
	 		data = JSON.parse(dataString); // <--- this is the effect where the data is updated
	 	});
	 </script	
	 	<Layout
	 	component="Breadcrumbs"
	 	example={source(data)}
	 	{md}
	 	bind:events>
	 	{#snippet controls()}
	 		<PropsChanger
	 			label="Data"
	 			object
	 			bind:value={dataString} /> // <--- this is the new variable
	 	{/snippet}
	 	{#snippet main()}
	 		<Breadcrumbs
				 bind:data > // <--- this is the bind
			</Breadcrumbs> 
	 	{/snippet}
		 </Layout>

	*/
</script>

<div class="props-changer">
	{#if text && typeof value === 'string'}
		<div class="props-changer--item">
			<TextInput
				id={`text-${text}`}
				name="text"
				{label}
				type="text"
				bind:value
				{onInput}
				{onBlur} />
		</div>
	{/if}
	{#if number}
		<div class="props-changer--item">
			<label for="number">{label}</label>
			<input
				type="number"
				id="number"
				bind:value
				oninput={onInput}
				onblur={onBlur} />
		</div>
	{/if}
	{#if (checkbox && typeof value === 'boolean') || typeof value === 'undefined'}
		<div class="props-changer--item">
			<label for="boolean">{label}</label>
			<Checkbox
				id="boolean-{label}"
				name="boolean-{label}s"
				bind:checked={value}
				size="medium"
				onChange={onInput} />
		</div>
	{/if}
	{#if object && typeof value === 'string'}
		<label for="object">{label}</label>
		<div class="props-changer--item">
			<TextInput
				id={`text-${text}`}
				name="text"
				{label}
				type="multiline"
				bind:value
				{onInput}
				{onBlur} />
		</div>
	{/if}
	{#if select}
		<div class="props-changer--item">
			<label for="select">{label}</label>
			<select
				bind:value
				id="select"
				oninput={onInput}
				onblur={onBlur}>
				{#each selectOptions as option}
					<option value={option}>{option}</option>
				{/each}
			</select>
		</div>
	{/if}
</div>

<style lang="scss">
	@use '@surveyplanet/styles' as *;

	.props-changer {
		display: flex;
		flex-direction: column;
	}
	.props-changer--item {
		font: $font--large;
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
		label {
			margin-bottom: 0.5rem;
		}
		input {
			padding: 0.5rem;
			border-radius: 4px;
			border: 1px solid $color--beige;
		}
		input[type='checkbox'] {
			appearance: unset;
		}
	}
</style>
