<script lang="ts">
	let {
		text,
		number,
		boolean,
		object,
		textInputHandler,
		numberInputHandler,
		booleanInputHandler,
		objectInputHandler,
		blurHandler,
		value = '',
	} = $props<{
		text?: string;
		number?: string;
		boolean?: string;
		object?: string;
		textInputHandler?: (e: Event) => void;
		numberInputHandler?: (e: Event) => void;
		booleanInputHandler?: (e: Event) => void;
		objectInputHandler?: (e: Event) => void;
		blurHandler?: () => void;
		value?: string | number | boolean | null | undefined;
	}>();
</script>

<div class="props-changer">
	{#if text}
		<div class="props-changer--item">
			<label for="text">{text}</label>
			<input
				type="text"
				id="text"
				{value}
				oninput={textInputHandler}
				onblur={blurHandler} />
		</div>
	{/if}
	{#if number}
		<div class="props-changer--item">
			<label for="number">{number}</label>
			<input
				type="number"
				id="number"
				{value}
				oninput={numberInputHandler}
				onblur={blurHandler} />
		</div>
	{/if}
	{#if (boolean && typeof value === 'boolean') || typeof value === 'undefined'}
		<div class="props-changer--item">
			<label for="boolean">{boolean}</label>
			<input
				type="checkbox"
				id="boolean"
				checked={value}
				oninput={booleanInputHandler}
				onblur={blurHandler} />
		</div>
	{/if}
	{#if object && typeof value === 'string'}
		<div class="props-changer--item">
			<label for="object">{object}</label>
			<textarea
				id="object"
				value={`${value}`}
				oninput={objectInputHandler}
				onblur={blurHandler} />
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
	}
</style>
